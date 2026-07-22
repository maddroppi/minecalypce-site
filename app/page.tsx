'use client';

import { useState, useEffect, useRef } from 'react';
import DonatePage from './donate/page';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Эффект для частиц
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1
      });
    }

    let animationId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 180, 255, ${p.alpha})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const copyIP = () => {
    const ip = 'play.minecalypce.online';
    navigator.clipboard.writeText(ip).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setShowModal={setShowModal} copied={copied} copyIP={copyIP} />;
      case 'about':
        return <AboutPage />;
      case 'howto':
        return <HowToPage />;
      case 'rules':
        return <RulesPage />;
      case 'faq':
        return <FaqPage />;
      case 'contacts':
        return <ContactsPage />;
      case 'donate':
        return <DonatePage />;
      default:
        return <HomePage setShowModal={setShowModal} copied={copied} copyIP={copyIP} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #001220 0%, #002244 30%, #003366 60%, #001a33 100%)',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
      
      <nav style={{
  position: 'sticky',
  top: 0,
  zIndex: 100,
  background: 'rgba(0, 20, 40, 0.85)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(100, 180, 255, 0.2)',
  padding: '0 20px',
}}>
  <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>
      <span style={{ color: '#66ddff', fontSize: '24px', fontWeight: 'bold' }}>MineCalypce</span>
    </div>
    
    {/* КНОПКА БУРГЕРА — ВИДНА ТОЛЬКО НА ТЕЛЕФОНЕ */}
    <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{
      display: 'none',
      background: 'none',
      border: 'none',
      color: '#88ddff',
      fontSize: '28px',
      cursor: 'pointer',
      padding: '4px 8px'
    }} className="menu-toggle">
      ☰
    </button>

    {/* ДЕСКТОПНОЕ МЕНЮ */}
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="nav-links">
      {['home', 'about', 'howto', 'rules', 'faq', 'contacts', 'donate'].map((page) => (
        <button key={page} onClick={() => { setCurrentPage(page); setIsMenuOpen(false); }} style={{
          background: currentPage === page ? 'rgba(50, 150, 255, 0.2)' : 'transparent',
          color: currentPage === page ? '#66ddff' : '#88aadd',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.3s',
          fontWeight: currentPage === page ? 'bold' : 'normal'
        }}>
          {page === 'home' && '🏠 Главная'}
          {page === 'about' && 'ℹ️ О сервере'}
          {page === 'howto' && '🎮 Как начать'}
          {page === 'rules' && '📜 Правила'}
          {page === 'faq' && '❓ FAQ'}
          {page === 'contacts' && '📞 Контакты'}
          {page === 'donate' && '💎 Донат'}
        </button>
      ))}
    </div>
  </div>
  
  {/* МОБИЛЬНОЕ МЕНЮ (выезжает по клику на бургер) */}
  {isMenuOpen && (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      gap: '8px',
      borderTop: '1px solid rgba(100, 180, 255, 0.1)',
      background: 'rgba(0, 20, 40, 0.95)'
    }} className="mobile-menu">
      {['home', 'about', 'howto', 'rules', 'faq', 'contacts', 'donate'].map((page) => (
        <button key={page} onClick={() => { setCurrentPage(page); setIsMenuOpen(false); }} style={{
          background: currentPage === page ? 'rgba(50, 150, 255, 0.2)' : 'transparent',
          color: currentPage === page ? '#66ddff' : '#88aadd',
          border: 'none',
          padding: '12px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          textAlign: 'left',
          borderBottom: '1px solid rgba(100, 180, 255, 0.05)',
          width: '100%'
        }}>
          {page === 'home' && '🏠 Главная'}
          {page === 'about' && 'ℹ️ О сервере'}
          {page === 'howto' && '🎮 Как начать'}
          {page === 'rules' && '📜 Правила'}
          {page === 'faq' && '❓ FAQ'}
          {page === 'contacts' && '📞 Контакты'}
          {page === 'donate' && '💎 Донат'}
        </button>
      ))}
    </div>
  )}
</nav>

      <style>{`
  @media (max-width: 768px) {
    .nav-links { 
      display: none !important; 
    }
    .menu-toggle { 
      display: block !important; 
    }
  }
  @media (min-width: 769px) {
    .mobile-menu { 
      display: none !important; 
    }
  }
  .card-animated {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    animation: fadeIn 0.3s ease-out;
    padding: 20px;
  }
  .modal-content {
    background: linear-gradient(135deg, #001a33, #002244);
    border-radius: 24px;
    padding: 40px;
    max-width: 500px;
    width: 100%;
    border: 1px solid rgba(100, 180, 255, 0.3);
    box-shadow: 0 20px 60px rgba(0, 50, 150, 0.5);
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
  }
  .modal-close {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    color: #88ddff;
    font-size: 28px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .modal-close:hover { transform: rotate(90deg); color: #66ccff; }
  .step {
    background: rgba(50, 150, 255, 0.05);
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 12px;
    border: 1px solid rgba(50, 150, 255, 0.1);
    text-align: left;
    color: #aaddff;
  }
  .step-number {
    display: inline-block;
    background: linear-gradient(135deg, #3399ff, #0066cc);
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    text-align: center;
    line-height: 28px;
    font-weight: bold;
    margin-right: 10px;
    font-size: 14px;
  }
  .rule-section {
    background: rgba(50, 150, 255, 0.05);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    border-left: 3px solid #3399ff;
  }
  .rule-item {
    padding: 8px 0;
    border-bottom: 1px solid rgba(100, 180, 255, 0.05);
    color: #aaddff;
  }
  .rule-item:last-child { border-bottom: none; }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
`}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', position: 'relative', zIndex: 1 }}>
        {renderPage()}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <h2 style={{ color: '#66ddff', fontSize: '28px', marginBottom: '20px', textAlign: 'center' }}>🎮 Как начать играть</h2>
            <div className="step"><div><span className="step-number">1</span><strong style={{ color: '#66ddff' }}>Скопируй IP</strong></div><div style={{ marginTop: '8px', paddingLeft: '38px' }}>Нажми кнопку <strong style={{ color: '#66ddff' }}>«Скопировать IP»</strong> на главной</div></div>
            <div className="step"><div><span className="step-number">2</span><strong style={{ color: '#66ddff' }}>Открой Minecraft</strong></div><div style={{ marginTop: '8px', paddingLeft: '38px' }}>Запусти игру и выбери <strong style={{ color: '#66ddff' }}>«Мультиплеер»</strong></div></div>
            <div className="step"><div><span className="step-number">3</span><strong style={{ color: '#66ddff' }}>Добавь сервер</strong></div><div style={{ marginTop: '8px', paddingLeft: '38px' }}>Нажми <strong style={{ color: '#66ddff' }}>«Добавить сервер»</strong> и вставь IP</div></div>
            <div className="step"><div><span className="step-number">4</span><strong style={{ color: '#66ddff' }}>Играй!</strong></div><div style={{ marginTop: '8px', paddingLeft: '38px' }}>Выбери сервер и нажми <strong style={{ color: '#66ddff' }}>«Подключиться»</strong> 🚀</div></div>
            <div className="step" style={{ borderColor: 'rgba(100, 180, 255, 0.3)', background: 'rgba(50, 150, 255, 0.08)' }}>
              <div><span className="step-number">📌</span><strong style={{ color: '#66ddff' }}>Поддерживаемые версии</strong></div>
              <div style={{ marginTop: '8px', paddingLeft: '38px', color: '#88ddff' }}><strong>1.18</strong> — <strong>1.21.4</strong><br /><span style={{ fontSize: '12px', color: '#88aadd' }}>(Любая версия в этом диапазоне)</span></div>
            </div>
            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(50, 150, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(50, 150, 255, 0.2)', textAlign: 'center' }}>
              <code style={{ color: '#66ddff', fontSize: '18px', fontWeight: 'bold' }}>play.minecalypce.online</code>
              <br />
              <button style={{ marginTop: '10px', background: 'linear-gradient(135deg, #3399ff, #0066cc)', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', transition: 'all 0.3s' }} onClick={copyIP}>📋 Скопировать IP</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- КОМПОНЕНТЫ СТРАНИЦ ---

function HomePage({ setShowModal, copied, copyIP }: any) {
  // Состояние для онлайна
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Запрос к API для получения онлайна
  useEffect(() => {
    const fetchPlayerCount = async () => {
      try {
        const response = await fetch(
          `https://api.mcsrvstat.us/2/play.minecalypce.online`
        );
        const data = await response.json();
        
        if (data.online) {
          setOnlinePlayers(data.players.online);
        } else {
          setOnlinePlayers(0);
        }
      } catch (error) {
        console.error('Ошибка при получении количества игроков:', error);
        setOnlinePlayers(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerCount();
    const interval = setInterval(fetchPlayerCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 0' }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(15px)',
        borderRadius: '24px',
        padding: '40px 30px',
        border: '1px solid rgba(100, 180, 255, 0.3)',
        boxShadow: '0 20px 60px rgba(0, 50, 150, 0.5)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 64px)',
          fontWeight: 'bold',
          color: '#66ddff',
          textShadow: '0 0 30px rgba(0, 150, 255, 0.8), 0 0 60px rgba(0, 100, 255, 0.5)',
          marginBottom: '10px',
          letterSpacing: '2px'
        }}>MineCalypce</h1>
        <p style={{ fontSize: 'clamp(18px, 3vw, 22px)', color: '#88ddff', marginBottom: '30px' }}>🕊️ Мирное выживание без PvP</p>
        <div style={{
          backgroundColor: 'rgba(50, 150, 255, 0.15)',
          borderRadius: '12px',
          padding: '15px',
          marginBottom: '30px',
          border: '1px solid rgba(50, 150, 255, 0.3)'
        }}>
          <code style={{ color: '#66ddff', fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 'bold' }}>play.minecalypce.online</code>
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            background: 'linear-gradient(135deg, #3399ff, #0066cc)',
            color: 'white',
            border: 'none',
            padding: '16px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 20px rgba(0, 100, 255, 0.4)'
          }} onClick={() => setShowModal(true)}>▶ Начать играть</button>
          <button style={{
            backgroundColor: copied ? 'rgba(0, 255, 100, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            color: copied ? '#66ff99' : '#88ddff',
            border: copied ? '1px solid #66ff99' : '1px solid #66ccff',
            padding: '16px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }} onClick={copyIP}>{copied ? '✅ Скопировано!' : '📋 Скопировать IP'}</button>
        </div>
        <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          {['🕊️ Без PvP', '🏠 Приваты территорий', '🌍 Огромный мир 1x1 млн', '👥 Дружелюбное сообщество'].map((text) => (
            <div key={text} className="card-animated" style={{
              backgroundColor: 'rgba(50, 150, 255, 0.08)',
              padding: '15px',
              borderRadius: '12px',
              border: '1px solid rgba(50, 150, 255, 0.2)',
              color: '#aaddff',
              fontSize: '14px'
            }}>{text}</div>
          ))}
        </div>
        
        {/* БЛОК С ОНЛАЙНОМ - ТЕПЕРЬ РАБОЧИЙ */}
        <div style={{ marginTop: '30px', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(0, 255, 100, 0.05)', border: '1px solid rgba(0, 255, 100, 0.15)' }}>
          <span style={{ color: '#66ddff', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              backgroundColor: onlinePlayers > 0 ? '#66ff99' : '#ff6666', 
              animation: 'pulse 2s infinite' 
            }}></span>
            Игроков онлайн: <strong style={{ color: onlinePlayers > 0 ? '#66ff99' : '#ff6666' }}>{isLoading ? '...' : onlinePlayers}</strong>
          </span>
          <span style={{ color: '#88aadd', fontSize: '12px', display: 'block', marginTop: '4px' }}>
            {isLoading ? '⏳ Загрузка...' : (onlinePlayers > 0 ? '🎮 Не хочешь вместе с ними?' : 'Заходи первым! 🎮')}
          </span>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(15px)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(100, 180, 255, 0.3)', boxShadow: '0 20px 60px rgba(0, 50, 150, 0.5)' }}>
        <h2 style={{ color: '#66ddff', fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: '10px', textAlign: 'center' }}>ℹ️ О сервере</h2>
        <p style={{ color: '#88aadd', textAlign: 'center', marginBottom: '30px', fontSize: '16px' }}>
          Всё, что нужно знать о MineCalypce
        </p>
        
        {/* Полное описание */}
        <div style={{ 
          color: '#aaddff', 
          lineHeight: '1.8', 
          marginBottom: '30px',
          padding: '20px',
          background: 'rgba(50, 150, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(50, 150, 255, 0.1)'
        }}>
          <p style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#66ddff' }}>MineCalypce</strong> - это уникальный сервер мирного выживания, созданный для тех, кто ценит <strong style={{ color: '#66ddff' }}>спокойную атмосферу, дружелюбное сообщество и возможность строить без страха</strong>.
          </p>
          <p style={{ marginBottom: '12px' }}>
            На нашем сервере ты можешь <strong style={{ color: '#66ddff' }}>полностью сосредоточиться на развитии</strong>: добывай ресурсы, возводи грандиозные постройки, исследуй огромный мир и общайся с другими игроками в уютной обстановке.
          </p>
          <p style={{ marginBottom: '12px' }}>
            Здесь <strong style={{ color: '#ff8888' }}>строго запрещено гриферство и PvP</strong> - мы тщательно следим за порядком, чтобы каждый игрок чувствовал себя в безопасности. Нарушители <strong style={{ color: '#ff8888' }}>моментально получают наказание</strong>, а твои постройки надёжно защищены приват-системой.
          </p>
          <p style={{ marginBottom: '0' }}>
            <strong style={{ color: '#66ddff' }}>Присоединяйся к нам</strong> и стань частью большого и дружного сообщества MineCalypce! Здесь каждый найдет себе занятие по душе — будь то строительство, фермерство, исследование или просто приятное общение.
          </p>
        </div>
        
        {/* Преимущества в карточках — исправленные (одинаковая высота) */}
<h3 style={{ color: '#66ddff', fontSize: 'clamp(18px, 2vw, 22px)', marginBottom: '20px', textAlign: 'center' }}>✨ Что тебя ждёт на сервере</h3>
<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
  gap: '15px', 
  marginBottom: '30px',
  alignItems: 'stretch' // 👈 РАСТЯГИВАЕТ ВСЕ КАРТОЧКИ ПО ВЫСОТЕ
}}>
  <div style={{ 
    background: 'rgba(50, 150, 255, 0.08)', 
    padding: '18px 14px', 
    borderRadius: '12px', 
    border: '1px solid rgba(50, 150, 255, 0.2)', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // 👈 ВСЁ СВЕРХУ
    height: '100%', // 👈 ВЫСОТА 100% ОТ РОДИТЕЛЯ
    minHeight: '140px' // 👈 МИНИМАЛЬНАЯ ВЫСОТА
  }}>
    <div style={{ fontSize: '32px', marginBottom: '6px' }}>🕊️</div>
    <div style={{ color: '#66ddff', fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>Без PvP</div>
    <div style={{ fontSize: '13px', color: '#88aadd', lineHeight: '1.4' }}>Никаких случайных смертей и драк — только мирное выживание</div>
  </div>
  <div style={{ 
    background: 'rgba(50, 150, 255, 0.08)', 
    padding: '18px 14px', 
    borderRadius: '12px', 
    border: '1px solid rgba(50, 150, 255, 0.2)', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    minHeight: '140px'
  }}>
    <div style={{ fontSize: '32px', marginBottom: '6px' }}>🛡️</div>
    <div style={{ color: '#66ddff', fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>Защита от гриферства</div>
    <div style={{ fontSize: '13px', color: '#88aadd', lineHeight: '1.4' }}>Приват-система и строгие наказания для нарушителей</div>
  </div>
  <div style={{ 
    background: 'rgba(50, 150, 255, 0.08)', 
    padding: '18px 14px', 
    borderRadius: '12px', 
    border: '1px solid rgba(50, 150, 255, 0.2)', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    minHeight: '140px'
  }}>
    <div style={{ fontSize: '32px', marginBottom: '6px' }}>🌍</div>
    <div style={{ color: '#66ddff', fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>Огромный мир</div>
    <div style={{ fontSize: '13px', color: '#88aadd', lineHeight: '1.4' }}>1x1 млн блоков для исследований и строительства</div>
  </div>
  <div style={{ 
    background: 'rgba(50, 150, 255, 0.08)', 
    padding: '18px 14px', 
    borderRadius: '12px', 
    border: '1px solid rgba(50, 150, 255, 0.2)', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    minHeight: '140px'
  }}>
    <div style={{ fontSize: '32px', marginBottom: '6px' }}>👥</div>
    <div style={{ color: '#66ddff', fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>Дружелюбное сообщество</div>
    <div style={{ fontSize: '13px', color: '#88aadd', lineHeight: '1.4' }}>Отзывчивые игроки, помощь новичкам и уютная атмосфера</div>
  </div>
  <div style={{ 
    background: 'rgba(50, 150, 255, 0.08)', 
    padding: '18px 14px', 
    borderRadius: '12px', 
    border: '1px solid rgba(50, 150, 255, 0.2)', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    minHeight: '140px'
  }}>
    <div style={{ fontSize: '32px', marginBottom: '6px' }}>📋</div>
    <div style={{ color: '#66ddff', fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>Удобное меню команд</div>
    <div style={{ fontSize: '13px', color: '#88aadd', lineHeight: '1.4' }}>Все команды в одном месте - просто введи <strong style={{ color: '#66ddff' }}>/menu</strong></div>
  </div>
  <div style={{ 
    background: 'rgba(50, 150, 255, 0.08)', 
    padding: '18px 14px', 
    borderRadius: '12px', 
    border: '1px solid rgba(50, 150, 255, 0.2)', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    minHeight: '140px'
  }}>
    <div style={{ fontSize: '32px', marginBottom: '6px' }}>💎</div>
    <div style={{ color: '#66ddff', fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>Донат-привилегии</div>
    <div style={{ fontSize: '13px', color: '#88aadd', lineHeight: '1.4' }}>Уникальные возможности для поддержки сервера</div>
  </div>
</div>
        
        {/* Версии */}
        <div style={{ 
          padding: '15px', 
          background: 'rgba(50, 150, 255, 0.08)', 
          borderRadius: '12px', 
          border: '1px solid rgba(50, 150, 255, 0.2)',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <span style={{ color: '#88aadd' }}>🔄 Поддерживаемые версии Minecraft:</span>
          <strong style={{ color: '#66ddff', display: 'block', fontSize: '20px', marginTop: '4px' }}>1.18 - 1.21.4</strong>
          <span style={{ color: '#88aadd', fontSize: '13px' }}>(Любая версия в этом диапазоне)</span>
        </div>
        
        {/* Призыв к действию */}
        <div style={{ 
          padding: '20px', 
          background: 'rgba(0, 255, 100, 0.05)', 
          borderRadius: '12px', 
          textAlign: 'center', 
          border: '1px solid rgba(0, 255, 100, 0.15)' 
        }}>
          <p style={{ color: '#88ddff', fontSize: '16px', marginBottom: '12px' }}>
            🌟 Готов стать частью нашего сообщества?
          </p>
          <code style={{ color: '#66ddff', fontSize: '18px', fontWeight: 'bold' }}>play.minecalypce.online</code>
        </div>
      </div>
    </div>
  );
}

function HowToPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(15px)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(100, 180, 255, 0.3)', boxShadow: '0 20px 60px rgba(0, 50, 150, 0.5)' }}>
        <h2 style={{ color: '#66ddff', fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: '20px', textAlign: 'center' }}>🎮 Как начать играть</h2>
        <div className="step"><div><span className="step-number">1</span><strong style={{ color: '#66ddff' }}>Скопируй IP</strong></div><div style={{ marginTop: '8px', paddingLeft: '38px' }}>Нажми кнопку <strong style={{ color: '#66ddff' }}>«Скопировать IP»</strong> на главной</div></div>
        <div className="step"><div><span className="step-number">2</span><strong style={{ color: '#66ddff' }}>Открой Minecraft</strong></div><div style={{ marginTop: '8px', paddingLeft: '38px' }}>Запусти игру и выбери <strong style={{ color: '#66ddff' }}>«Мультиплеер»</strong></div></div>
        <div className="step"><div><span className="step-number">3</span><strong style={{ color: '#66ddff' }}>Добавь сервер</strong></div><div style={{ marginTop: '8px', paddingLeft: '38px' }}>Нажми <strong style={{ color: '#66ddff' }}>«Добавить сервер»</strong> и вставь IP</div></div>
        <div className="step"><div><span className="step-number">4</span><strong style={{ color: '#66ddff' }}>Играй!</strong></div><div style={{ marginTop: '8px', paddingLeft: '38px' }}>Выбери сервер и нажми <strong style={{ color: '#66ddff' }}>«Подключиться»</strong> 🚀</div></div>
        <div className="step" style={{ borderColor: 'rgba(100, 180, 255, 0.3)', background: 'rgba(50, 150, 255, 0.08)' }}>
          <div><span className="step-number">📌</span><strong style={{ color: '#66ddff' }}>Поддерживаемые версии</strong></div>
          <div style={{ marginTop: '8px', paddingLeft: '38px', color: '#88ddff' }}><strong>1.18</strong> — <strong>1.21.4</strong><br /><span style={{ fontSize: '12px', color: '#88aadd' }}>(Любая версия в этом диапазоне)</span></div>
        </div>
      </div>
    </div>
  );
}

function RulesPage() {
  const rulesData = [
    { 
      title: 'Общие положения', 
      items: [
        '1) Играя на сервере вы соглашаетесь со всеми нижеуказанными положениями.',
        '2) Незнание правил не освобождает от ответственности.',
        '3) Администрация оставляет за собой право изменять правила.',
        '4) Администрация вправе выносить наказания за действия, не указанные в правилах.'
      ] 
    },
    { 
      title: '1. Поведение в чате', 
      items: [
        { text: '1.1. Запрет оскорблений, угроз, дискриминации.', punishment: 'Мут от 10 минут' },
        { text: '1.2. Запрет спама, флуда, рекламы сторонних ресурсов.', punishment: 'Мут от 10 минут' },
        { text: '1.3. Соблюдение нормы вежливого общения.', punishment: null }
      ] 
    },
    { 
      title: '2. Игровая механика и запрещённые действия', 
      items: [
        { text: '2.1. Запрет гриферства/убийств (разрушение/изменение чужих построек без разрешения/действия приводящие к смерти игрока с причиною или без причины).', punishment: 'Тюрьма от 10 минут' },
        { text: '2.2. Запрет читов, модификаций с нечестным преимуществом.', punishment: 'Бан от 1 дня' },
        { text: '2.3. Запрет эксплуатации багов и уязвимостей и лаг машин.', punishment: 'Бан от 1 дня' },
        { text: '2.4. Приват - территория которая отображается при вводе команды "/rg i". Если постройка находится вне привата (отсутствует при проверке /rg i), то это территория никому не принадлежит. Если игрок проживает на территории без Привата, то это нельзя считать его домом, в таком случае гриф его построек - не является грифом. Если игрок добавляет в приват человека, он делает это на свой страх и риск. В случае кражи вещей человека прописанного в приват - это не считается грифом.', punishment: null }
      ] 
    },
    { 
      title: '3. Откат вещей', 
      items: [
        { text: '3.1. Откат вещей игрока в случае их утраты/потери не предусмотрен.', punishment: null },
        { text: '3.2. Если вещи были потеряны в случае грифа, любого нарушения другого игрока то администрация в праве вернуть вещи игрока на свое усмотрение.', punishment: null },
        { text: '3.3. При жалобе на игрока который нарушением повлек потерю ваших предметов нужно предоставить видеофиксацию, в случае отсутствия вещи не будут возвращены.', punishment: null }
      ] 
    },
    { 
      title: '4. PvP действия', 
      items: [
        { text: '4.1. PvP запрещено. В случае убийства другого игрока определенное количество раз вы будете посажены в тюрьму, а если будет подана жалоба или нарушение замечено администрацией будет выдано наказание в виде блокировки от 1 часа.', punishment: 'Тюрьма/Бан от 10 минут' },
        { text: '4.2. Аппеляция наказаний не рассматривается.', punishment: null },
        { text: '4.3. PvP разрешено только на территории "PvP арены".', punishment: null },
        { text: '4.4. На PvP арене нет правил - убивать можно любым доступным способом.', punishment: null },
        { text: '4.5. Если PvP произошло вне PvP арены но по согласию обоих сторон, игроки все НЕ будут наказаны, но при условии что оба отписали в чат свое согласие.', punishment: null },
        { text: '4.6. Если игрок убил другого игрока в случае самозащиты и это будет доказано достоверным источником - игрок будет не виновен. (при злоупотреблении этой возможностью игрок также будет наказан).', punishment: null }
      ] 
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(15px)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(100, 180, 255, 0.3)', boxShadow: '0 20px 60px rgba(0, 50, 150, 0.5)' }}>
        <h2 style={{ color: '#66ddff', fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: '20px', textAlign: 'center' }}>📜 Правила сервера</h2>
        {rulesData.map((section, idx) => (
          <div key={idx} className="rule-section">
            <h3 style={{ color: '#66ddff', marginBottom: '12px', fontSize: 'clamp(16px, 2vw, 20px)' }}>{section.title}</h3>
            {section.items.map((item, i) => {
              const text = typeof item === 'string' ? item : item.text;
              const punishment = typeof item === 'string' ? null : item.punishment;
              
              return (
                <div key={i} className="rule-item" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <span style={{ flex: 1 }}>{text}</span>
                  {punishment && (
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(255, 80, 80, 0.12)',
                      color: '#ff8888',
                      padding: '3px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      border: '1px solid rgba(255, 80, 80, 0.15)',
                      backdropFilter: 'blur(4px)',
                      letterSpacing: '0.3px'
                    }}>
                      ⚠️ {punishment}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <p style={{ color: '#88aadd', fontSize: '13px', textAlign: 'center', marginTop: '20px' }}>Последнее обновление: 22.07.2026</p>
      </div>
    </div>
  );
}

function FaqPage() {
  const faqs = [
    { q: 'Какие версии поддерживаются?', a: 'Сервер поддерживает версии Minecraft с 1.18 по 1.21.4.' },
    { q: 'Есть ли PvP на сервере?', a: 'PvP запрещено на всей территории, кроме специальной PvP-арены.' },
    { q: 'Как узнать есть ли приват?', a: 'Используй команду /rg i для проверки привата. Если территория не привачена - она ничья.' },
    { q: 'Что делать если забанили/замутили?', a: 'Аппеляция наказаний не рассматривается. Соблюдай правила, чтобы избежать наказаний.' },
    { q: 'Можно ли использовать читы?', a: 'Нет, использование читов и модов с нечестным преимуществом запрещено и карается баном.' },
    { q: 'Как попасть на сервер?', a: 'Скопируй IP play.minecalypce.online, добавь сервер в Minecraft и подключайся!' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(15px)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(100, 180, 255, 0.3)', boxShadow: '0 20px 60px rgba(0, 50, 150, 0.5)' }}>
        <h2 style={{ color: '#66ddff', fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: '20px', textAlign: 'center' }}>❓ Частые вопросы</h2>
        {faqs.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(50, 150, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(50, 150, 255, 0.1)' }}>
            <div style={{ color: '#66ddff', fontWeight: 'bold', marginBottom: '6px' }}>❔ {faq.q}</div>
            <div style={{ color: '#aaddff' }}>{faq.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(15px)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(100, 180, 255, 0.3)', boxShadow: '0 20px 60px rgba(0, 50, 150, 0.5)' }}>
        <h2 style={{ color: '#66ddff', fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: '20px', textAlign: 'center' }}>📞 Контакты</h2>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#88ddff', fontSize: '18px', marginBottom: '15px', textAlign: 'center' }}>📢 Основной канал</h3>
          <a href="https://t.me/minecalypce" target="_blank" rel="noopener noreferrer" style={{ 
            textDecoration: 'none', 
            display: 'block',
            background: 'rgba(50, 150, 255, 0.08)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid rgba(50, 150, 255, 0.2)', 
            textAlign: 'center', 
            transition: 'all 0.3s', 
            color: '#aaddff',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '40px' }}>📱</div>
            <div style={{ color: '#66ddff', fontWeight: 'bold', marginTop: '8px' }}>Telegram</div>
            <div style={{ fontSize: '14px' }}>@minecalypce</div>
          </a>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#88ddff', fontSize: '18px', marginBottom: '15px', textAlign: 'center' }}>👑 Владелец сервера</h3>
          <a href="https://t.me/maddroppi" target="_blank" rel="noopener noreferrer" style={{ 
            textDecoration: 'none', 
            display: 'block',
            background: 'rgba(50, 150, 255, 0.08)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid rgba(50, 150, 255, 0.2)', 
            textAlign: 'center', 
            transition: 'all 0.3s', 
            color: '#aaddff',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '40px' }}>👤</div>
            <div style={{ color: '#66ddff', fontWeight: 'bold', marginTop: '8px' }}>Telegram</div>
            <div style={{ fontSize: '14px' }}>@maddroppi</div>
          </a>
        </div>

        <div>
          <h3 style={{ color: '#88ddff', fontSize: '18px', marginBottom: '15px', textAlign: 'center' }}>🎵 TikTok</h3>
          <a href="https://www.tiktok.com/@minecalypce_server" target="_blank" rel="noopener noreferrer" style={{ 
            textDecoration: 'none', 
            display: 'block',
            background: 'rgba(50, 150, 255, 0.08)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid rgba(50, 150, 255, 0.2)', 
            textAlign: 'center', 
            transition: 'all 0.3s', 
            color: '#aaddff',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '40px' }}>🎵</div>
            <div style={{ color: '#66ddff', fontWeight: 'bold', marginTop: '8px' }}>TikTok</div>
            <div style={{ fontSize: '14px' }}>@minecalypce_server</div>
          </a>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(50, 150, 255, 0.05)', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(50, 150, 255, 0.1)' }}>
          <p style={{ color: '#88aadd' }}>IP сервера:</p>
          <code style={{ color: '#66ddff', fontSize: '20px', fontWeight: 'bold' }}>play.minecalypce.online</code>
        </div>
      </div>
    </div>
  );
}