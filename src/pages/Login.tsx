import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('isAuthenticated', 'true');
        toast({
          title: 'Добро пожаловать! 🎉',
          description: 'Вы успешно вошли в личный кабинет',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Ошибка входа',
          description: 'Пожалуйста, заполните все поля',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail('demo@shoppingbank.ru');
    setPassword('demo123');
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      toast({
        title: 'Демо-вход выполнен! 🎉',
        description: 'Добро пожаловать в личный кабинет',
      });
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-pulse"></div>
      
      <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <Icon name="ArrowLeft" size={20} />
          На главную
        </Button>
      </div>

      <Card className="w-full max-w-md relative z-10 animate-scale-in shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-float">
            🛍️
          </div>
          <CardTitle className="text-3xl font-bold mb-2">Личный кабинет</CardTitle>
          <CardDescription className="text-base">Войдите в аккаунт ShoppingBank</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email или номер телефона</Label>
              <div className="relative">
                <Icon name="Mail" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder="demo@shoppingbank.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Icon name="Lock" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                <span>Запомнить меня</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Забыли пароль?
              </a>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={20} className="animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  Войти
                  <Icon name="ArrowRight" size={20} />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-4 text-muted-foreground">или</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full mb-3" 
            size="lg"
            onClick={handleDemoLogin}
          >
            <Icon name="Sparkles" size={20} />
            Демо-вход (без регистрации)
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg">
              <Icon name="Smartphone" size={20} />
              Госуслуги
            </Button>
            <Button variant="outline" size="lg">
              <Icon name="Fingerprint" size={20} />
              Биометрия
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <a href="#" className="text-primary font-semibold hover:underline">
              Зарегистрироваться
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
