import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Video = () => {
  const navigate = useNavigate();

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

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Смотрите как работает ShoppingBank
              </h1>
              <p className="text-xl text-muted-foreground">
                Полный обзор всех возможностей банка
              </p>
            </div>

            <Card className="overflow-hidden shadow-2xl animate-scale-in">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://disk.yandex.ru/i/xXrPNvP0-FTwoA"
                    className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="ShoppingBank Video"
                  />
                </div>
              </CardContent>
              <div className="p-8 bg-gradient-to-br from-card to-card/50">
                <h2 className="text-2xl font-bold mb-4">О видео</h2>
                <p className="text-muted-foreground mb-6">
                  В этом видео вы узнаете о всех возможностях ShoppingBank: как получить карту, переводить деньги, 
                  копить с выгодой и зарабатывать кэшбэк до 30%.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Button 
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={() => navigate('/download')}
                  >
                    <Icon name="Download" size={20} />
                    Скачать приложение
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/login')}
                  >
                    <Icon name="LogIn" size={20} />
                    Войти в личный кабинет
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: 'Wallet', title: 'Оформите карту', description: 'Всего за 2 минуты онлайн' },
                { icon: 'ArrowLeftRight', title: 'Переводите деньги', description: 'В любой банк без комиссии' },
                { icon: 'Gift', title: 'Получайте кэшбэк', description: 'До 30% за каждую покупку' },
              ].map((item, i) => (
                <Card key={i} className="hover:scale-105 transition-transform animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <Icon name={item.icon as any} size={32} className="text-white" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Video;
