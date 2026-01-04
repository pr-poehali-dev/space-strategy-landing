import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const races = [
  {
    name: 'Люди',
    title: 'Объединённая Федерация',
    description: 'Адаптивные и изобретательные исследователи космоса. Люди полагаются на технологии и дипломатию для расширения своего влияния в галактике.',
    image: 'https://cdn.poehali.dev/projects/6af4ac5b-b19e-4a52-a2dd-5f4c176712f7/files/8a9d19fa-782b-4024-80a2-6412c7b5ecc9.jpg',
    color: 'text-primary',
    stats: { attack: 7, defense: 8, speed: 6, tech: 9 }
  },
  {
    name: 'Жуки',
    title: 'Рой Тиранидов',
    description: 'Безжалостные завоеватели, действующие как единый организм. Жуки быстро размножаются и адаптируются к любым условиям боя.',
    image: 'https://cdn.poehali.dev/projects/6af4ac5b-b19e-4a52-a2dd-5f4c176712f7/files/d83bb1ec-a576-4884-bf10-f1e096f98921.jpg',
    color: 'text-green-400',
    stats: { attack: 9, defense: 6, speed: 9, tech: 5 }
  },
  {
    name: 'Роботы',
    title: 'Синтетический Коллектив',
    description: 'Высокоразвитый искусственный интеллект с идеальной логикой. Роботы строят неприступные оборонительные системы и просчитывают каждый ход.',
    image: 'https://cdn.poehali.dev/projects/6af4ac5b-b19e-4a52-a2dd-5f4c176712f7/files/f9376973-dfb8-4ee5-be5a-7fd590450041.jpg',
    color: 'text-red-400',
    stats: { attack: 8, defense: 10, speed: 4, tech: 10 }
  }
];

const planets = [
  { name: 'Терра Прайм', x: 30, y: 40, color: 'bg-blue-500' },
  { name: 'Ксерокс-7', x: 60, y: 20, color: 'bg-green-500' },
  { name: 'Механус', x: 80, y: 60, color: 'bg-red-500' },
  { name: 'Нова Секторис', x: 45, y: 75, color: 'bg-purple-500' },
];

export default function Index() {
  const [selectedRace, setSelectedRace] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [spaceshipPosition, setSpaceshipPosition] = useState({ x: -100, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setSpaceshipPosition(prev => {
        const newX = prev.x + 0.5;
        if (newX > 110) {
          return { x: -100, y: Math.random() * 80 + 10 };
        }
        return { x: newX, y: prev.y };
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const simulateBattle = () => {
    setIsSimulating(true);
    setBattleLog([]);
    const attacker = races[selectedRace];
    const defenderIndex = (selectedRace + 1) % races.length;
    const defender = races[defenderIndex];

    const log = [
      `⚔️ Битва началась! ${attacker.name} vs ${defender.name}`,
      `🚀 ${attacker.name} выдвигает флот из 250 кораблей`,
      `🛡️ ${defender.name} активирует защитные системы`,
      `💥 Первый залп! Урон: ${attacker.stats.attack * 12} единиц`,
      `⚡ Контратака ${defender.name}! Урон: ${defender.stats.defense * 10} единиц`,
      `🎯 Критический удар! Уничтожено 47 кораблей противника`,
      `✨ ${attacker.name} использует спецспособность расы!`,
      `🏆 Победа ${attacker.name}! Сектор захвачен!`
    ];

    log.forEach((entry, index) => {
      setTimeout(() => {
        setBattleLog(prev => [...prev, entry]);
        if (index === log.length - 1) {
          setIsSimulating(false);
        }
      }, index * 800);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#14192f] to-[#0a0e27] text-foreground relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/6af4ac5b-b19e-4a52-a2dd-5f4c176712f7/files/1c5d0868-b6ca-4649-afa7-7767c9a48618.jpg)' }}
      />
      <div className="star-field fixed inset-0 opacity-30" />
      
      <div 
        className="fixed w-20 h-20 pointer-events-none transition-all duration-100 z-50"
        style={{ 
          left: `${spaceshipPosition.x}%`, 
          top: `${spaceshipPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-xl" />
          <Icon name="Rocket" size={48} className="text-primary glow animate-pulse" style={{ transform: 'rotate(-45deg)' }} />
          <div className="absolute -right-4 top-1/2 w-12 h-1 bg-gradient-to-r from-primary to-transparent blur-sm" />
        </div>
      </div>
      
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-30" />
        
        <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
          <Badge className="text-lg px-6 py-2 bg-primary/20 border-primary text-primary glow" variant="outline">
            ALPHA 2.0
          </Badge>
          
          <h1 className="text-7xl md:text-9xl font-bold glow text-primary mb-4">
            GALAXY WARS
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Завоюй галактику. Построй империю. Уничтожь врагов.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow"
              onClick={() => setShowRegistration(true)}
            >
              <Icon name="Rocket" className="mr-2" size={24} />
              Начать игру
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10">
              <Icon name="PlayCircle" className="mr-2" size={24} />
              Смотреть трейлер
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary glow">500K+</div>
              <div className="text-sm text-muted-foreground">Игроков онлайн</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary glow">1000+</div>
              <div className="text-sm text-muted-foreground">Галактик</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent glow">24/7</div>
              <div className="text-sm text-muted-foreground">Сражения</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/6af4ac5b-b19e-4a52-a2dd-5f4c176712f7/files/bb641f75-1296-49f8-b936-0bf14edd30e9.jpg)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 glow">
              Исследуй <span className="text-primary">Галактику</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Тысячи планет ждут твоего открытия
            </p>
          </div>

          <div className="relative h-96 bg-gradient-to-br from-card/50 to-card/30 rounded-lg border border-border overflow-hidden">
            <div className="absolute inset-0 star-field opacity-30" />
            {planets.map((planet, index) => (
              <div
                key={index}
                className={`absolute w-16 h-16 rounded-full ${planet.color} animate-float cursor-pointer hover:scale-125 transition-transform glow-box`}
                style={{
                  left: `${planet.x}%`,
                  top: `${planet.y}%`,
                  animationDelay: `${index * 0.5}s`
                }}
                title={planet.name}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-bold opacity-0 hover:opacity-100 transition-opacity">
                  {planet.name}
                </div>
              </div>
            ))}
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2 bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border">
                <Icon name="Globe" size={48} className="mx-auto text-primary glow" />
                <p className="text-lg font-semibold">Наведи на планету</p>
                <p className="text-sm text-muted-foreground">Исследуй ресурсы и захвати территорию</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/6af4ac5b-b19e-4a52-a2dd-5f4c176712f7/files/837de4df-8859-4aef-b493-294de77ffc9c.jpg)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 glow">
              Выбери свою <span className="text-secondary">Расу</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Каждая раса обладает уникальными способностями
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {races.map((race, index) => (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all cursor-pointer group overflow-hidden"
                onClick={() => setSelectedRace(index)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={race.image} 
                    alt={race.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <Badge className={`absolute top-4 right-4 ${race.color} bg-card/80 border-current`}>
                    {selectedRace === index ? '✓ Выбрано' : 'Выбрать'}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className={`text-3xl ${race.color} glow`}>{race.name}</CardTitle>
                  <CardDescription className="text-base">{race.title}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{race.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <Icon name="Sword" size={16} /> Атака
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-4 rounded ${
                              i < race.stats.attack ? 'bg-primary' : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <Icon name="Shield" size={16} /> Защита
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-4 rounded ${
                              i < race.stats.defense ? 'bg-secondary' : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <Icon name="Zap" size={16} /> Скорость
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-4 rounded ${
                              i < race.stats.speed ? 'bg-accent' : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <Icon name="Cpu" size={16} /> Технологии
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-4 rounded ${
                              i < race.stats.tech ? 'bg-primary' : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-card/20 to-transparent">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/6af4ac5b-b19e-4a52-a2dd-5f4c176712f7/files/b0782cbd-ef02-4927-ba01-6eee724df9ef.jpg)' }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 glow">
              Испытай <span className="text-destructive">Геймплей</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Симулятор боевой системы в реальном времени
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-3">
                <Icon name="Swords" className="text-destructive glow" size={32} />
                Демонстрация боя
              </CardTitle>
              <CardDescription>
                Выбери расу выше и запусти симуляцию сражения
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ${races[selectedRace].color} glow`}>
                    <Icon name="User" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{races[selectedRace].name}</div>
                    <div className="text-sm text-muted-foreground">{races[selectedRace].title}</div>
                  </div>
                </div>
                
                <Button 
                  onClick={simulateBattle}
                  disabled={isSimulating}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  {isSimulating ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                      Симуляция...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" className="mr-2" size={20} />
                      Начать бой
                    </>
                  )}
                </Button>
              </div>

              <div className="min-h-64 max-h-96 overflow-y-auto bg-background/50 rounded-lg border border-border p-4 space-y-2 font-mono text-sm">
                {battleLog.length === 0 ? (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center space-y-2">
                      <Icon name="Swords" size={48} className="mx-auto opacity-50" />
                      <p>Нажми "Начать бой" для запуска симуляции</p>
                    </div>
                  </div>
                ) : (
                  battleLog.map((entry, index) => (
                    <div 
                      key={index} 
                      className="animate-fade-in p-2 hover:bg-muted/30 rounded transition-colors"
                    >
                      {entry}
                    </div>
                  ))
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="text-center space-y-1">
                  <Icon name="Target" className="mx-auto text-primary" size={24} />
                  <div className="text-2xl font-bold text-primary">98.7%</div>
                  <div className="text-xs text-muted-foreground">Точность</div>
                </div>
                <div className="text-center space-y-1">
                  <Icon name="Zap" className="mx-auto text-secondary" size={24} />
                  <div className="text-2xl font-bold text-secondary">342</div>
                  <div className="text-xs text-muted-foreground">DPS</div>
                </div>
                <div className="text-center space-y-1">
                  <Icon name="Shield" className="mx-auto text-accent" size={24} />
                  <div className="text-2xl font-bold text-accent">1.2K</div>
                  <div className="text-xs text-muted-foreground">Броня</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {showRegistration && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowRegistration(false)}>
          <Card className="w-full max-w-md bg-card border-primary/50" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="relative">
              <button 
                onClick={() => setShowRegistration(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
              <CardTitle className="text-3xl glow text-primary flex items-center gap-3">
                <Icon name="Rocket" size={32} />
                Регистрация
              </CardTitle>
              <CardDescription>Присоединяйся к 500,000+ игрокам</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Позывной командира</label>
                <input 
                  type="text" 
                  placeholder="Введи свой ник"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  placeholder="твой@email.com"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Пароль</label>
                <input 
                  type="password" 
                  placeholder="Минимум 8 символов"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Выбери расу</label>
                <div className="grid grid-cols-3 gap-2">
                  {races.map((race, index) => (
                    <button
                      key={index}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedRace === index 
                          ? 'border-primary bg-primary/20' 
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedRace(index)}
                    >
                      <div className={`text-2xl mb-1 ${race.color}`}>
                        {race.name === 'Люди' ? '👨‍🚀' : race.name === 'Жуки' ? '🐛' : '🤖'}
                      </div>
                      <div className="text-xs font-semibold">{race.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-bold animate-pulse-glow">
                <Icon name="Sparkles" className="mr-2" size={20} />
                Начать завоевание
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Регистрируясь, ты принимаешь условия использования и политику конфиденциальности
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <footer className="relative py-12 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h3 className="text-3xl font-bold glow text-primary">GALAXY WARS</h3>
          <p className="text-muted-foreground">© 2026 Galaxy Wars. Все права защищены.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Discord
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}