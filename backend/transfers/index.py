import json
import os
import psycopg2
from typing import Dict, Any
from decimal import Decimal

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Переводы между картами, по номеру телефона и в другие банки
    Args: event - запрос с httpMethod, body
          context - контекст выполнения функции
    Returns: HTTP ответ с результатом перевода
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            from_card_id = body.get('from_card_id')
            amount = Decimal(str(body.get('amount', 0)))
            description = body.get('description', 'Перевод')
            
            to_card_number = body.get('to_card_number')
            to_phone = body.get('to_phone')
            to_bank = body.get('to_bank')
            
            cur.execute("SELECT balance FROM cards WHERE id = %s", (from_card_id,))
            from_card = cur.fetchone()
            
            if not from_card or from_card[0] < amount:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Недостаточно средств'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                "UPDATE cards SET balance = balance - %s WHERE id = %s",
                (amount, from_card_id)
            )
            
            to_card_id = None
            transaction_type = 'transfer'
            
            if to_card_number:
                cur.execute("SELECT id FROM cards WHERE card_number = %s", (to_card_number,))
                to_card = cur.fetchone()
                if to_card:
                    to_card_id = to_card[0]
                    cur.execute(
                        "UPDATE cards SET balance = balance + %s WHERE id = %s",
                        (amount, to_card_id)
                    )
                    transaction_type = 'internal_transfer'
            
            cur.execute(
                "INSERT INTO transactions (from_card_id, to_card_id, to_phone, to_bank, amount, description, transaction_type) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
                (from_card_id, to_card_id, to_phone, to_bank, amount, description, transaction_type)
            )
            transaction_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'transaction_id': transaction_id,
                    'amount': float(amount),
                    'message': 'Перевод выполнен успешно'
                }),
                'isBase64Encoded': False
            }
        
        if method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            card_id = params.get('card_id')
            
            cur.execute(
                "SELECT id, from_card_id, to_card_id, to_phone, to_bank, amount, description, transaction_type, created_at FROM transactions WHERE from_card_id = %s OR to_card_id = %s ORDER BY created_at DESC LIMIT 50",
                (card_id, card_id)
            )
            transactions = cur.fetchall()
            
            transactions_list = []
            for tx in transactions:
                transactions_list.append({
                    'id': tx[0],
                    'from_card_id': tx[1],
                    'to_card_id': tx[2],
                    'to_phone': tx[3],
                    'to_bank': tx[4],
                    'amount': float(tx[5]),
                    'description': tx[6],
                    'transaction_type': tx[7],
                    'created_at': str(tx[8])
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'transactions': transactions_list}),
                'isBase64Encoded': False
            }
            
    finally:
        cur.close()
        conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
