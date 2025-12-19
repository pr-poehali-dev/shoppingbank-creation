import json
import os
import random
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Управление банковскими картами: создание, получение списка
    Args: event - запрос с httpMethod, body, queryStringParameters
          context - контекст выполнения функции
    Returns: HTTP ответ с данными карт
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
            first_name = body.get('first_name')
            last_name = body.get('last_name')
            card_type = body.get('card_type', 'standard')
            
            card_number = ''.join([str(random.randint(0, 9)) for _ in range(16)])
            
            cur.execute(
                "INSERT INTO cards (user_id, card_number, card_type, balance) VALUES (%s, %s, %s, 0) RETURNING id, card_number, balance",
                (user_id, card_number, card_type)
            )
            card_data = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'id': card_data[0],
                    'card_number': card_data[1],
                    'balance': float(card_data[2]),
                    'card_type': card_type,
                    'holder_name': f'{first_name} {last_name}'
                }),
                'isBase64Encoded': False
            }
        
        if method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            user_id = params.get('user_id')
            
            cur.execute(
                "SELECT id, card_number, card_type, balance, is_active, created_at FROM cards WHERE user_id = %s",
                (user_id,)
            )
            cards = cur.fetchall()
            
            cards_list = []
            for card in cards:
                cards_list.append({
                    'id': card[0],
                    'card_number': card[1],
                    'card_type': card[2],
                    'balance': float(card[3]),
                    'is_active': card[4],
                    'created_at': str(card[5])
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'cards': cards_list}),
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
