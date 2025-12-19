import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Александр Иванов',
    balance: 125430,
    cardNumber: '•••• 4521',
    cashback: 3240,
    tariff: 'Премиум'
  });

  const transactions = [
    { id: 1, title: 'Пятёрочка', amount: -1250, category: 'Продукты', date: '19.12.2024', cashback: 125 },
    { id: 2, title: 'Яндекс.Такси', amount: -450, category: 'Транспорт', date: '19.12.2024', cashback: 45 },
    { id: 3, title: 'Wildberries', amount: -5600, category: 'Одежда', date: '18.12.2024', cashback: 1680 },
    { id: 4, title: 'Зарплата', amount: 85000, category: 'Доход', date: '15.12.2024', cashback: 0 },
  ];

  const cards = [
    { id: 1, name: 'Основная карта', number: '•••• 4521', balance: 125430, type: 'premium', color: 'from-purple-500 to-pink-500' },
    { id: 2, name: 'Накопительная', number: '•••• 7892', balance: 50000, type: 'savings', color: 'from-blue-500 to-cyan-500' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-lg bg-card/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl">
              🛍️
            </div>
            <span className="text-2xl font-bold">ShoppingBank</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              <Icon name="Crown" size={16} className="text-primary" />
              {user.tariff}
            </Badge>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Привет, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-muted-foreground">Управляй финансами легко и выгодно</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {cards.map((card) => (
            <Card key={card.id} className={`relative overflow-hidden bg-gradient-to-br ${card.color} text-white hover:scale-105 transition-transform cursor-pointer`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription className="text-white/80 mb-1">{card.name}</CardDescription>
                    <CardTitle className="text-3xl font-mono">{card.number}</CardTitle>
                  </div>
                  <Icon name="CreditCard" size={32} className="text-white/80" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">
                  {card.balance.toLocaleString('ru-RU')} ₽
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Icon name="Shield" size={16} />
                  <span className="text-sm">Защищено 3D Secure</span>
                </div>
              </CardContent>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Кэшбэк</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Icon name="Gift" size={20} className="text-green-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500 mb-1">
                +{user.cashback.toLocaleString('ru-RU')} ₽
              </div>
              <p className="text-sm text-muted-foreground">В этом месяце</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Траты</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Icon name="TrendingDown" size={20} className="text-orange-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">87 450 ₽</div>
              <Progress value={67} className="h-2 mt-2" />
              <p className="text-sm text-muted-foreground mt-1">67% от лимита</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Цели</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Icon name="Target" size={20} className="text-blue-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">2 из 3</div>
              <p className="text-sm text-muted-foreground">Достигнуто</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="transactions">
              <Icon name="Receipt" size={16} />
              Операции
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Icon name="BarChart3" size={16} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="services">
              <Icon name="Grid3x3" size={16} />
              Сервисы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Последние операции</CardTitle>
                <CardDescription>История транзакций за последние дни</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${tx.amount > 0 ? 'bg-green-500/10' : 'bg-primary/10'} flex items-center justify-center`}>
                          <Icon name={tx.amount > 0 ? 'ArrowDownLeft' : 'ArrowUpRight'} size={24} className={tx.amount > 0 ? 'text-green-500' : 'text-primary'} />
                        </div>
                        <div>
                          <div className="font-semibold">{tx.title}</div>
                          <div className="text-sm text-muted-foreground">{tx.category} • {tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${tx.amount > 0 ? 'text-green-500' : ''}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('ru-RU')} ₽
                        </div>
                        {tx.cashback > 0 && (
                          <div className="text-sm text-green-500">+{tx.cashback} ₽ кэшбэк</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Категории расходов</CardTitle>
                  <CardDescription>Распределение трат в декабре</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { category: 'Продукты', amount: 25000, percent: 35, color: 'bg-purple-500' },
                    { category: 'Транспорт', amount: 12000, percent: 17, color: 'bg-blue-500' },
                    { category: 'Одежда', amount: 18000, percent: 25, color: 'bg-pink-500' },
                    { category: 'Развлечения', amount: 16000, percent: 23, color: 'bg-orange-500' },
                  ].map((item) => (
                    <div key={item.category}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-muted-foreground">{item.amount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                        <div className={`absolute inset-y-0 left-0 ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Статистика кэшбэка</CardTitle>
                  <CardDescription>Заработано за последние месяцы</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { month: 'Декабрь', amount: 3240, trend: 'up' },
                      { month: 'Ноябрь', amount: 2850, trend: 'up' },
                      { month: 'Октябрь', amount: 2100, trend: 'down' },
                    ].map((item) => (
                      <div key={item.month} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name={item.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={20} className={item.trend === 'up' ? 'text-green-500' : 'text-orange-500'} />
                          <span className="font-medium">{item.month}</span>
                        </div>
                        <span className="text-xl font-bold text-green-500">+{item.amount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Smartphone', title: 'Мобильная связь', description: 'Пополнить телефон', color: 'from-purple-500 to-pink-500' },
                { icon: 'Zap', title: 'ЖКХ', description: 'Оплатить услуги', color: 'from-orange-500 to-red-500' },
                { icon: 'Car', title: 'Штрафы ГИБДД', description: 'Проверить и оплатить', color: 'from-blue-500 to-cyan-500' },
                { icon: 'Tv', title: 'Интернет и ТВ', description: 'Оплатить провайдера', color: 'from-green-500 to-emerald-500' },
                { icon: 'Landmark', title: 'Налоги', description: 'Уплата налогов', color: 'from-yellow-500 to-orange-500' },
                { icon: 'Gift', title: 'Подарки', description: 'Купить сертификат', color: 'from-indigo-500 to-purple-500' },
              ].map((service) => (
                <Card key={service.title} className="hover:scale-105 transition-transform cursor-pointer group">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:animate-float`}>
                      <Icon name={service.icon as any} size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      Перейти
                      <Icon name="ArrowRight" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
