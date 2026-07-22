'use client';

export default function DonatePage() {
  const donateItems = [
    { 
      name: 'Випка',
      color: '#55ff55',
      price: '39 ₽',
      commands: [
        '/kit vip — Набор предметов',
        '/craft — Открыть верстак',
        '/spit — Плюнуть в игрока'
      ],
      features: [
        'Слотов на аукционе: 4',
        'Кол-во регионов: 3 штуки',
        'Точек дома: 3 штуки',
        'Размер региона: 25.000'
      ]
    },
    { 
      name: 'Премиум',
      color: '#ffff55',
      price: '99 ₽',
      commands: [
        '/kit premium — Набор предметов',
        '/craft — Открыть верстак',
        '/spit — Плюнуть в игрока',
        '/feed — Накормить себя',
        '/ptime — Установить время для себя',
        '/ec — Открыть виртуальное хранилище',
        '/suicide — Убить себя',
        '/ignore — Игнорировать игрока',
        '/loom — Открыть ткацкий станок'
      ],
      features: [
        'Слотов на аукционе: 5',
        'Кол-во регионов: 4 штуки',
        'Точек дома: 4 штуки',
        'Размер региона: 30.000'
      ]
    },
    { 
      name: 'Платинум',
      color: '#FF3519',
      price: '164 ₽',
      commands: [
        '/kit platinum — Набор предметов',
        '/craft — Открыть верстак',
        '/spit — Плюнуть в игрока',
        '/feed — Накормить себя',
        '/ptime — Установить время для себя',
        '/ec — Открыть виртуальное хранилище',
        '/suicide — Убить себя',
        '/ignore — Игнорировать игрока',
        '/loom — Открыть ткацкий станок',
        '/heal — Вылечить себя',
        '/invsee — Посмотреть чужой инвентарь',
        '/clear — Отчистить инвентарь',
        '/gringstone — Открыть точильню'
      ],
      features: [
        'Слотов на аукционе: 6',
        'Кол-во регионов: 5 штук',
        'Точек дома: 5 штук',
        'Размер региона: 35.000'
      ]
    },
    { 
      name: 'Элита',
      color: '#E33BD2',
      price: '299 ₽',
      commands: [
        '/kit elita — Набор предметов',
        '/craft — Открыть верстак',
        '/spit — Плюнуть в игрока',
        '/feed — Накормить себя',
        '/ptime — Установить время для себя',
        '/ec — Открыть виртуальное хранилище',
        '/suicide — Убить себя',
        '/ignore — Игнорировать игрока',
        '/loom — Открыть ткацкий станок',
        '/heal — Вылечить себя',
        '/invsee — Посмотреть чужой инвентарь',
        '/clear — Отчистить инвентарь',
        '/gringstone — Открыть точильню',
        '/feed [ник] — Накормить друга',
        '/near — Посмотреть игроков вокруг себя',
        '/lightning — Ударить молнией',
        '/itemname — Сменить название предмета',
        '/afk — Встать в афк'
      ],
      features: [
        'Слотов на аукционе: 7',
        'Кол-во регионов: 6 штук',
        'Точек дома: 6 штук',
        'Размер региона: 40.000'
      ]
    },
    { 
      name: 'Легенда',
      color: '#55ffff',
      price: '384 ₽',
      commands: [
        '/kit legenda — Набор предметов',
        '/craft — Открыть верстак',
        '/spit — Плюнуть в игрока',
        '/feed — Накормить себя',
        '/ptime — Установить время для себя',
        '/ec — Открыть виртуальное хранилище',
        '/suicide — Убить себя',
        '/ignore — Игнорировать игрока',
        '/loom — Открыть ткацкий станок',
        '/heal — Вылечить себя',
        '/invsee — Посмотреть чужой инвентарь',
        '/clear — Отчистить инвентарь',
        '/gringstone — Открыть точильню',
        '/feed [ник] — Накормить друга',
        '/near — Посмотреть игроков вокруг себя',
        '/lightning — Ударить молнией',
        '/itemname — Сменить название предмета',
        '/afk — Встать в афк',
        '/heal [ник] — Вылечить друга',
        '/rtp near — Телепортация к игроку в мире',
        '/anvil — Открыть наковальню'
      ],
      features: [
        'Слотов на аукционе: 8',
        'Кол-во регионов: 7 штук',
        'Точек дома: 7 штук',
        'Размер региона: 45.000'
      ]
    },
    { 
      name: 'DIVINE',
      color: '#ffaa00',
      price: '599 ₽',
      commands: [
        '/kit divine — Набор предметов',
        '/craft — Открыть верстак',
        '/spit — Плюнуть в игрока',
        '/feed — Накормить себя',
        '/ptime — Установить время для себя',
        '/ec — Открыть виртуальное хранилище',
        '/suicide — Убить себя',
        '/ignore — Игнорировать игрока',
        '/loom — Открыть ткацкий станок',
        '/heal — Вылечить себя',
        '/invsee — Посмотреть чужой инвентарь',
        '/clear — Отчистить инвентарь',
        '/gringstone — Открыть точильню',
        '/feed [ник] — Накормить друга',
        '/near — Посмотреть игроков вокруг себя',
        '/lightning — Ударить молнией',
        '/itemname — Сменить название предмета',
        '/afk — Встать в афк',
        '/heal [ник] — Вылечить друга',
        '/rtp near — Телепортация к игроку в мире',
        '/elytrafly — Включить полет на элитре',
        '/anvil — Открыть наковальню',
        '/socialspy — Включить чтение чужих лс',
        '/fix — Починить предмет в руке'
      ],
      features: [
        'Слотов на аукционе: 9',
        'Кол-во регионов: 8 штук',
        'Точек дома: 8 штук',
        'Размер региона: 50.000'
      ]
    },
    { 
      name: 'EXCLUSIVE',
      color: '#FB52F9',
      price: '1499 ₽',
      commands: [
        '/kit exclusive — Набор предметов',
        '/craft — Открыть верстак',
        '/spit — Плюнуть в игрока',
        '/feed — Накормить себя',
        '/ptime — Установить время для себя',
        '/ec — Открыть виртуальное хранилище',
        '/suicide — Убить себя',
        '/ignore — Игнорировать игрока',
        '/loom — Открыть ткацкий станок',
        '/heal — Вылечить себя',
        '/invsee — Посмотреть чужой инвентарь',
        '/clear — Отчистить инвентарь',
        '/gringstone — Открыть точильню',
        '/feed [ник] — Накормить друга',
        '/near — Посмотреть игроков вокруг себя',
        '/lightning — Ударить молнией',
        '/itemname — Сменить название предмета',
        '/afk — Встать в афк',
        '/heal [ник] — Вылечить друга',
        '/rtp near — Телепортация к игроку в мире',
        '/elytrafly — Включить флай на элитре',
        '/anvil — Открыть наковальню',
        '/socialspy — Включить чтение чужих лс',
        '/fix — Починить предмет в руке',
        '/fly — Включить режим полёта',
        '/panel — Личная панель наград',
        '/pipi — Пописать',
        '/kaka — Покакать',
        '/fix all — Починить все предметы в инвентаре'
      ],
      features: [
        'Слотов на аукционе: 10',
        'Кол-во регионов: 9 штук',
        'Точек дома: 9 штук',
        'Размер региона: 55.000'
      ]
    },
    { 
      name: '🎲 Кейс с донатом',
      color: '#FF8CDB',
      price: '129 ₽',
      isCase: true,
      commands: [],
      features: [
        'Шансы и выпадаемые привилегии:',
        '  • Випка (30%) — навсегда',
        '  • Премиум (25%) — навсегда',
        '  • Платинум (20%) — навсегда',
        '  • Элита (15%) — навсегда'
      ]
    },
    { 
      name: 'Личный титул',
      color: '#FFCF8E',
      price: '199 ₽',
      commands: [],
      features: [
        'У вас будет личный титул, который будет отображаться в табе, чате и над головой',
        'Пример: %player_name% ✨твой текст',
        'Длина титула может быть до 10 символов',
        '(цветовой код не учитывается)'
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #001220 0%, #002244 30%, #003366 60%, #001a33 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(15px)',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid rgba(100, 180, 255, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 50, 150, 0.5)'
        }}>
          <h2 style={{
            color: '#66ddff',
            fontSize: 'clamp(28px, 4vw, 36px)',
            marginBottom: '10px',
            textAlign: 'center'
          }}>💎 Донат</h2>
          <p style={{
            color: '#88aadd',
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '16px'
          }}>
            Поддержи сервер и получи крутые преимущества! 🚀
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {donateItems.map((item, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: `2px solid ${item.color}33`,
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0,
                animationDelay: `${idx * 0.05}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${item.color}33`;
                e.currentTarget.style.borderColor = item.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `${item.color}33`;
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: '8px',
                  color: item.color,
                  textShadow: `0 0 20px ${item.color}44`
                }}>
                  {item.isCase ? '🎲' : '💎'} {item.name}
                </div>
                <div style={{
                  color: '#ffdd66',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: '16px'
                }}>
                  {item.price}
                </div>
                
                {item.commands.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      color: '#88ddff',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      marginBottom: '6px'
                    }}>📋 Команды:</div>
                    {item.commands.map((cmd, i) => (
                      <div key={i} style={{
                        color: '#aaddff',
                        fontSize: '12px',
                        padding: '2px 0',
                        borderBottom: '1px solid rgba(100, 180, 255, 0.05)'
                      }}>
                        {cmd}
                      </div>
                    ))}
                  </div>
                )}
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    color: '#88ddff',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    marginBottom: '6px'
                  }}>✨ Возможности:</div>
                  {item.features.map((feature, i) => (
                    <div key={i} style={{
                      color: '#aaddff',
                      fontSize: '12px',
                      padding: '3px 0',
                      borderBottom: '1px solid rgba(100, 180, 255, 0.05)',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button style={{
                  marginTop: '16px',
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}99)`,
                  color: '#001a33',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: `0 4px 20px ${item.color}44`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 6px 30px ${item.color}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = `0 4px 20px ${item.color}44`;
                }}
                onClick={() => window.open('https://t.me/minecalypce_donat', '_blank')}>
                  💰 Купить
                </button>
              </div>
            ))}
          </div>
          
          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: 'rgba(255, 200, 0, 0.05)',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid rgba(255, 200, 0, 0.15)'
          }}>
            <p style={{ color: '#88aadd' }}>
              📌 По всем вопросам доната обращайтесь к менеджеру:
            </p>
            <a href="https://t.me/minecalypce_donat" target="_blank" rel="noopener noreferrer" style={{
              color: '#ffdd66',
              fontSize: '18px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
              @minecalypce_donat
            </a>
          </div>
          
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}