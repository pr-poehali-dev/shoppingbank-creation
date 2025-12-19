import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanTerm, setLoanTerm] = useState(12);

  const products = [
    { icon: 'CreditCard', title: 'Платежи', description: 'Мгновенные переводы без комиссии', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { icon: 'Wallet', title: 'Кредиты', description: 'От 5% годовых на любые цели', color: 'bg-gradient-to-br from-orange-500 to-red-500' },
    { icon: 'TrendingUp', title: 'Инвестиции', description: 'Доходность до 15% годовых', color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { icon: 'Gift', title: 'Кэшбэк', description: 'До 30% за покупки у партнеров', color: 'bg-gradient-to-br from-green-500 to-emerald-500' },
    { icon: 'Sparkles', title: 'Карты', description: 'Бесплатное обслуживание навсегда', color: 'bg-gradient-to-br from-yellow-500 to-orange-500' },
    { icon: 'Users', title: 'Партнёры', description: 'Более 10000 магазинов', color: 'bg-gradient-to-br from-indigo-500 to-purple-500' },
  ];

  const tariffs = [
    { name: 'Старт', price: 0, features: ['Бесплатная карта', 'Переводы без комиссии', 'Кэшбэк 1%', 'Мобильное приложение'], popular: false },
    { name: 'Премиум', price: 299, features: ['2 карты бесплатно', 'Переводы без лимитов', 'Кэшбэк до 10%', 'Приоритетная поддержка', 'Страхование покупок'], popular: true },
    { name: 'VIP', price: 999, features: ['5 карт Metal', 'Безлимитные переводы', 'Кэшбэк до 30%', 'Персональный менеджер', 'Консьерж-сервис', 'Lounge в аэропортах'], popular: false },
  ];

  const calculateMonthlyPayment = () => {
    const rate = 0.05 / 12;
    const payment = (loanAmount * rate * Math.pow(1 + rate, loanTerm)) / (Math.pow(1 + rate, loanTerm) - 1);
    return Math.round(payment).toLocaleString('ru-RU');
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg z-50 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl">
              🛍️
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ShoppingBank
            </span>
          </div>
          <div className="hidden md:flex gap-6">
            {['home', 'about', 'products', 'tariffs', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`transition-all hover:text-primary ${activeSection === section ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
              >
                {section === 'home' && 'Главная'}
                {section === 'about' && 'О банке'}
                {section === 'products' && 'Продукты'}
                {section === 'tariffs' && 'Тарифы'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" onClick={() => navigate('/login')}>
            Личный кабинет
            <Icon name="ArrowRight" size={16} />
          </Button>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-pulse"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 text-lg px-6 py-2 bg-gradient-to-r from-primary to-secondary">
              🎉 Новый банк нового поколения
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              Банк, который любит шопинг
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Получайте кэшбэк до 30%, инвестируйте с умом и управляйте финансами в одном приложении
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform" onClick={() => navigate('/download')}>
                <Icon name="Download" size={20} />
                Скачать приложение
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:scale-105 transition-transform" onClick={() => navigate('/video')}>
                <Icon name="Play" size={20} />
                Смотреть видео
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6">О ShoppingBank</h2>
            <p className="text-xl text-muted-foreground">
              Мы создали банк для тех, кто любит делать покупки с выгодой. Современные технологии, максимальный кэшбэк и выгодные условия для каждого клиента.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Shield', title: '100% безопасно', description: 'Защита данных на уровне банков' },
              { icon: 'Zap', title: 'Мгновенно', description: 'Переводы за секунды 24/7' },
              { icon: 'Heart', title: 'Для людей', description: 'Поддержка в чате за 30 секунд' },
            ].map((item, i) => (
              <Card key={i} className="hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-primary/20 animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Icon name={item.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6">Наши продукты</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Всё необходимое для управления финансами в одном месте
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <Card key={i} className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`h-2 ${product.color}`}></div>
                <CardHeader>
                  <div className={`w-20 h-20 rounded-3xl ${product.color} flex items-center justify-center mb-4 group-hover:animate-float`}>
                    <Icon name={product.icon as any} size={40} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{product.title}</CardTitle>
                  <CardDescription className="text-base">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Подробнее
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
                <CardTitle className="text-3xl">Кредитный калькулятор</CardTitle>
                <CardDescription className="text-white/90">Рассчитайте ежемесячный платёж</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <label className="text-lg font-semibold mb-4 block">
                      Сумма кредита: {loanAmount.toLocaleString('ru-RU')} ₽
                    </label>
                    <input
                      type="range"
                      min="10000"
                      max="5000000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <div>
                    <label className="text-lg font-semibold mb-4 block">
                      Срок кредита: {loanTerm} месяцев
                    </label>
                    <input
                      type="range"
                      min="6"
                      max="60"
                      step="6"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
                    />
                  </div>
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl text-center">
                    <p className="text-lg text-muted-foreground mb-2">Ежемесячный платёж</p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {calculateMonthlyPayment()} ₽
                    </p>
                  </div>
                  <Button className="w-full py-6 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Оформить кредит
                    <Icon name="ArrowRight" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="tariffs" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6">Тарифы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выберите подходящий тариф и начните экономить уже сегодня
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tariffs.map((tariff, i) => (
              <Card key={i} className={`relative hover:scale-105 transition-all ${tariff.popular ? 'border-primary border-2 shadow-2xl shadow-primary/20' : ''} animate-scale-in`} style={{ animationDelay: `${i * 0.1}s` }}>
                {tariff.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary px-6 py-2 text-sm">
                      ⭐ Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">{tariff.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {tariff.price}
                    </span>
                    <span className="text-muted-foreground"> ₽/мес</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tariff.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${tariff.popular ? 'bg-gradient-to-r from-primary to-secondary' : ''}`} variant={tariff.popular ? 'default' : 'outline'}>
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-5xl font-bold mb-6">Контакты</h2>
              <p className="text-xl text-muted-foreground">
                Свяжитесь с нами удобным способом
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name="Phone" size={24} className="text-white" />
                    </div>
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-semibold mb-2">+7 924 354-40-27</p>
                  <p className="text-muted-foreground">Бесплатно по России, 24/7</p>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                      <Icon name="Mail" size={24} className="text-white" />
                    </div>
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-semibold mb-2">ujhleq@yandex.ru</p>
                  <p className="text-muted-foreground">Ответим в течение часа</p>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Напишите нам</CardTitle>
                <CardDescription>Мы ответим в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input type="email" placeholder="Email" />
                  <Input placeholder="Тема сообщения" />
                  <textarea
                    className="w-full min-h-[120px] rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Сообщение"
                  />
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Отправить сообщение
                    <Icon name="Send" size={16} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl">
                🛍️
              </div>
              <span className="text-xl font-bold">ShoppingBank</span>
            </div>
            <div className="flex gap-6 text-muted-foreground">
              <a href="#about" className="hover:text-primary transition-colors">О банке</a>
              <button onClick={() => navigate('/terms')} className="hover:text-primary transition-colors">Соглашение</button>
              <button onClick={() => navigate('/privacy')} className="hover:text-primary transition-colors">Политика</button>
              <a href="#contacts" className="hover:text-primary transition-colors">Помощь</a>
            </div>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                <button key={social} className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center">
                  <Icon name={social as any} size={20} />
                </button>
              ))}
            </div>
          </div>
          <div className="text-center mt-8 text-muted-foreground text-sm">
            © 2024 ShoppingBank. Все права защищены. Лицензия ЦБ РФ №1234
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;