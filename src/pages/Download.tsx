import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Download = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDownload = (platform: string) => {
    toast({
      title: 'Скачивание начато! 🚀',
      description: `Приложение для ${platform} скачивается...`,
    });
  };

  const features = [
    { icon: 'Zap', title: 'Мгновенные переводы', description: 'Отправляйте деньги за секунды' },
    { icon: 'Gift', title: 'Кэшбэк до 30%', description: 'Возвращайте деньги за покупки' },
    { icon: 'Shield', title: 'Полная безопасность', description: 'Биометрия и 3D Secure' },
    { icon: 'TrendingUp', title: 'Инвестиции', description: 'Вкладывайте и зарабатывайте' },
    { icon: 'Bell', title: 'Умные уведомления', description: 'Контроль всех операций' },
    { icon: 'Sparkles', title: 'Простой интерфейс', description: 'Интуитивно понятное управление' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl">
              🛍️
            </div>
            <span className="text-2xl font-bold">ShoppingBank</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} />
            На главную
          </Button>
        </div>
      </nav>

      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-pulse"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <Badge className="mb-6 text-lg px-6 py-2 bg-gradient-to-r from-primary to-secondary">
              📱 Скачайте приложение
            </Badge>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Банк в твоём телефоне
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Управляй финансами из любой точки мира. Доступно на iOS, Android и Web
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
                onClick={() => handleDownload('iOS')}
              >
                <Icon name="Apple" size={24} />
                App Store
              </Button>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-secondary to-accent hover:scale-105 transition-transform"
                onClick={() => handleDownload('Android')}
              >
                <Icon name="Smartphone" size={24} />
                Google Play
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
                onClick={() => navigate('/login')}
              >
                <Icon name="Globe" size={24} />
                Web-версия
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Star" size={16} className="text-yellow-500" />
                <span>4.9 рейтинг</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Download" size={16} className="text-green-500" />
                <span>2M+ скачиваний</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={16} className="text-blue-500" />
                <span>500K+ активных</span>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <Card className="overflow-hidden bg-gradient-to-br from-card to-card/50 shadow-2xl animate-scale-in">
              <div className="relative h-[500px] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                <div className="relative w-[280px] h-[560px] bg-background rounded-[3rem] border-8 border-foreground/10 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/10 rounded-b-3xl"></div>
                  <div className="p-6 h-full overflow-y-auto">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Баланс</p>
                          <p className="text-2xl font-bold">125 430 ₽</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                      </div>
                      <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl p-4 mb-4">
                        <p className="text-xs mb-2 opacity-80">ShoppingBank</p>
                        <p className="text-lg font-mono mb-3">•••• 4521</p>
                        <p className="text-xs opacity-80">Александр Иванов</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'Пятёрочка', amount: '-1 250 ₽', icon: 'ShoppingBag' },
                        { name: 'Яндекс.Такси', amount: '-450 ₽', icon: 'Car' },
                        { name: 'Wildberries', amount: '-5 600 ₽', icon: 'Package' },
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-card rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                              <Icon name={tx.icon as any} size={18} className="text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{tx.name}</p>
                              <p className="text-xs text-muted-foreground">19.12.2024</p>
                            </div>
                          </div>
                          <p className="text-sm font-semibold">{tx.amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Возможности приложения</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <Card key={i} className="hover:scale-105 transition-transform animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <Icon name={feature.icon as any} size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary text-white p-12">
                <h2 className="text-4xl font-bold mb-4">Начни экономить уже сегодня</h2>
                <p className="text-lg mb-8 text-white/90">
                  Установи приложение и получи 500 ₽ на счёт в подарок
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="text-lg px-8 py-6"
                    onClick={() => handleDownload('iOS')}
                  >
                    <Icon name="Apple" size={24} />
                    Скачать для iOS
                  </Button>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="text-lg px-8 py-6"
                    onClick={() => handleDownload('Android')}
                  >
                    <Icon name="Smartphone" size={24} />
                    Скачать для Android
                  </Button>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: 'Shield', text: 'Защита данных' },
                    { icon: 'Lock', text: 'Биометрия' },
                    { icon: 'Zap', text: 'Быстрая работа' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 justify-center">
                      <Icon name={item.icon as any} size={20} className="text-primary" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Download;
