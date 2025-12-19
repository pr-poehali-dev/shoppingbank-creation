import json
import os
import psycopg2
from typing import Dict, Any
from decimal import Decimal

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Управление тарифами: подписка на тариф, проверка статуса
    Args: event - запрос с httpMethod, body
          context - контекст выполнения функции
    Returns: HTTP ответ с данными о тарифе
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
            user_id = body.get('user_id')
            card_id = body.get('card_id')
            tariff_name = body.get('tariff_name')
            price = Decimal(str(body.get('price', 0)))
            
            cur.execute("SELECT balance FROM cards WHERE id = %s", (card_id,))
            card = cur.fetchone()
            
            if not card or card[0] < price:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Недостаточно средств для подписки'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                "UPDATE cards SET balance = balance - %s WHERE id = %s",
                (price, card_id)
            )
            
            cur.execute(
                "UPDATE tariffs SET is_active = false WHERE user_id = %s",
                (user_id,)
            )
            
            cur.execute(
                "INSERT INTO tariffs (user_id, tariff_name, price, is_active) VALUES (%s, %s, %s, true) RETURNING id",
                (user_id, tariff_name, price)
            )
            tariff_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'tariff_id': tariff_id,
                    'tariff_name': tariff_name,
                    'message': f'Тариф {tariff_name} успешно подключен'
                }),
                'isBase64Encoded': False
            }
        
        if method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            user_id = params.get('user_id')
            
            cur.execute(
                "SELECT id, tariff_name, price, start_date, is_active FROM tariffs WHERE user_id = %s ORDER BY start_date DESC LIMIT 1",
                (user_id,)
            )
            tariff = cur.fetchone()
            
            if tariff:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'id': tariff[0],
                        'tariff_name': tariff[1],
                        'price': float(tariff[2]),
                        'start_date': str(tariff[3]),
                        'is_active': tariff[4]
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'tariff_name': 'Старт', 'price': 0, 'is_active': True}),
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
