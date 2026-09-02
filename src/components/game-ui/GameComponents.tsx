import React from 'react';
import { 
  Sparkles, 
  Coins, 
  Flame, 
  ShieldCheck, 
  Lock, 
  Clock, 
  Play, 
  CheckCircle2, 
  Award,
  Zap,
  TrendingUp,
  Brain,
  AlertCircle,
  HelpCircle,
  X,
  Compass
} from 'lucide-react';
import { CardRarity, RARITY_CONFIGS, QuestStatus, QUEST_STATUS_CONFIGS, SM_TOKENS } from '../../theme/gameTheme';

/* -------------------------------------------------------------------------- */
/*                                 GAME BUTTON                                */
/* -------------------------------------------------------------------------- */

export interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'reward' | 'secondary' | 'turquoise' | 'success' | 'danger' | 'ghost' | 'outline' | 'special';
  size?: 'sm' | 'md' | 'lg' | 'tv';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
}

export const GameButton: React.FC<GameButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  glow = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-black transition-all duration-150 rounded-2xl cursor-pointer select-none border-2 active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none tracking-wide';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-xl',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2 rounded-2xl',
    lg: 'px-6 py-3 text-sm sm:text-base gap-2.5 rounded-2xl shadow-sm',
    tv: 'px-7 py-3.5 text-base sm:text-lg gap-3 rounded-2xl shadow-md font-black',
  };

  const variantStyles = {
    // Azul vibrante de ação e navegação (#2676D9)
    primary: 'bg-[#2676D9] hover:bg-[#1B65C2] active:bg-[#1652A3] text-white border-[#1652A3] shadow-md shadow-[#2676D9]/25 hover:shadow-[#2676D9]/35',
    // Dourado de recompensa principal (#F6B928)
    reward: 'bg-[#F6B928] hover:bg-[#E5A61A] active:bg-[#D68E08] text-[#18324A] border-[#D68E08] shadow-md shadow-[#F6B928]/30 hover:shadow-[#F6B928]/45',
    // Secundário: fundo branco/azul-claro com borda nítida (#C9DDF0)
    secondary: 'bg-[#FFFFFF] hover:bg-[#EAF4FF] active:bg-[#D6E8FA] text-[#18324A] border-[#C9DDF0] hover:border-[#2676D9] shadow-2xs',
    // Turquesa: avanço e interações positivas (#19B9B0)
    turquoise: 'bg-[#19B9B0] hover:bg-[#139E96] active:bg-[#0E7A74] text-white border-[#0E7A74] shadow-md shadow-[#19B9B0]/25',
    // Sucesso: verde para missões concluídas (#43B96A)
    success: 'bg-[#43B96A] hover:bg-[#36A25B] active:bg-[#2A8248] text-white border-[#2A8248] shadow-md shadow-[#43B96A]/25',
    // Especial: roxo (#8059D9)
    special: 'bg-[#8059D9] hover:bg-[#6F47C7] active:bg-[#5631A8] text-white border-[#5631A8] shadow-md shadow-[#8059D9]/25',
    // Erro / Destrutivo suave: coral (#E85D63)
    danger: 'bg-[#E85D63] hover:bg-[#D44A50] active:bg-[#B8363C] text-white border-[#B8363C] shadow-md shadow-[#E85D63]/25',
    ghost: 'bg-transparent hover:bg-[#EAF4FF] text-[#18324A] border-transparent hover:border-[#C9DDF0]',
    outline: 'bg-white hover:bg-[#F6FAFF] text-[#18324A] border-[#C9DDF0] hover:border-[#2676D9] shadow-2xs',
  };

  const glowStyle = glow ? 'ring-2 ring-[#F6B928]/50 ring-offset-2 ring-offset-white glow-reward' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${glowStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 GAME CARD                                  */
/* -------------------------------------------------------------------------- */

export interface GameCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  highlightBorder?: boolean;
  borderColor?: string;
  rarity?: CardRarity;
  interactive?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  children,
  elevated = false,
  highlightBorder = false,
  borderColor,
  rarity,
  interactive = false,
  className = '',
  ...props
}) => {
  const baseCard = 'rounded-3xl transition-all duration-200 overflow-hidden';
  
  let bgAndBorder = 'bg-white border-2 border-[#C9DDF0]';
  let shadow = elevated ? 'shadow-md shadow-[#18324A]/5' : 'shadow-2xs';

  if (rarity) {
    const rConfig = RARITY_CONFIGS[rarity];
    bgAndBorder = `${rConfig.cardBg} border-2 ${rConfig.cardBorder}`;
    if (rConfig.glowClass) {
      shadow = `${shadow} ${rConfig.glowClass}`;
    }
  } else if (highlightBorder) {
    bgAndBorder = 'bg-white border-2 border-[#2676D9]';
  } else if (borderColor) {
    bgAndBorder = `bg-white border-2 ${borderColor}`;
  }

  const hoverEffect = interactive 
    ? 'hover:-translate-y-1 hover:shadow-lg hover:border-[#2676D9] cursor-pointer' 
    : '';

  return (
    <div 
      className={`${baseCard} ${bgAndBorder} ${shadow} ${hoverEffect} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               XP PROGRESS BAR                              */
/* -------------------------------------------------------------------------- */

export interface XpProgressBarProps {
  currentXp: number;
  nextLevelXp: number;
  level?: number;
  showLevelBadge?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'tv';
  colorVariant?: 'gold' | 'turquoise' | 'blue';
  animated?: boolean;
  className?: string;
}

export const XpProgressBar: React.FC<XpProgressBarProps> = ({
  currentXp,
  nextLevelXp,
  level,
  showLevelBadge = true,
  size = 'md',
  colorVariant = 'gold',
  animated = true,
  className = '',
}) => {
  const percent = Math.min(100, Math.max(0, Math.round((currentXp / nextLevelXp) * 100)));

  const heightClasses = {
    sm: 'h-2.5',
    md: 'h-4',
    lg: 'h-5',
    tv: 'h-6',
  };

  const gradientColors = {
    gold: 'bg-gradient-to-r from-[#F6B928] via-[#F6B928] to-[#D68E08]',
    turquoise: 'bg-gradient-to-r from-[#19B9B0] via-[#19B9B0] to-[#139E96]',
    blue: 'bg-gradient-to-r from-[#2676D9] via-[#2676D9] to-[#1652A3]',
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          {showLevelBadge && level !== undefined && (
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#2676D9] to-[#1652A3] text-white font-black text-[11px] shadow-2xs">
              <Zap className="w-3 h-3 text-[#F6B928] fill-[#F6B928]" />
              <span>NÍVEL {level}</span>
            </div>
          )}
          <span className="font-extrabold text-[#18324A] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F6B928]" />
            <span>Progresso da Missão</span>
          </span>
        </div>
        <div className="font-black text-[#18324A] text-xs sm:text-sm">
          <span className="text-[#2676D9]">{currentXp}</span>
          <span className="text-[#60758A] mx-1">/</span>
          <span>{nextLevelXp} XP</span>
          <span className="text-xs font-bold text-[#19B9B0] ml-2">({percent}%)</span>
        </div>
      </div>

      <div className={`w-full ${heightClasses[size]} rounded-full bg-[#EAF4FF] p-0.5 overflow-hidden shadow-inner border-2 border-[#C9DDF0] relative`}>
        <div 
          className={`h-full rounded-full ${gradientColors[colorVariant]} shadow-xs transition-all duration-700 relative overflow-hidden`}
          style={{ width: `${percent}%` }}
        >
          {/* Light shine streak across bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 COIN BADGE                                 */
/* -------------------------------------------------------------------------- */

export interface CoinBadgeProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CoinBadge: React.FC<CoinBadgeProps> = ({
  amount,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1.5',
    md: 'px-2.5 py-1 text-xs sm:text-sm gap-2',
    lg: 'px-3.5 py-1.5 text-sm sm:text-base gap-2.5',
  };

  return (
    <div className={`inline-flex items-center font-black rounded-xl bg-amber-50 border border-amber-200 text-amber-900 shadow-2xs ${sizeStyles[size]} ${className}`}>
      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 border border-amber-500 text-amber-950 flex items-center justify-center font-black text-[9px] shadow-2xs shrink-0">
        <Coins className="w-2.5 h-2.5 text-amber-950" />
      </div>
      <span>{amount.toLocaleString('pt-BR')}</span>
      <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Moedas</span>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                RARITY BADGE                                */
/* -------------------------------------------------------------------------- */

export interface RarityBadgeProps {
  rarity: CardRarity;
  size?: 'sm' | 'md';
  className?: string;
}

export const RarityBadge: React.FC<RarityBadgeProps> = ({
  rarity,
  size = 'md',
  className = '',
}) => {
  const config = RARITY_CONFIGS[rarity] || RARITY_CONFIGS.comum;
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  return (
    <span className={`inline-flex items-center font-black rounded-full border-2 uppercase tracking-wider ${config.badgeBg} ${config.badgeText} ${config.badgeBorder} ${sizeClasses} ${className}`}>
      {rarity === 'lendario' && <Sparkles className="w-3 h-3 mr-1 text-[#F6B928]" />}
      {config.label}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                             QUEST STATUS BADGE                             */
/* -------------------------------------------------------------------------- */

export interface QuestStatusBadgeProps {
  status: QuestStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const QuestStatusBadge: React.FC<QuestStatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const config = QUEST_STATUS_CONFIGS[status] || QUEST_STATUS_CONFIGS['Disponível'];
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[10px] gap-1' : 'px-3 py-1 text-xs gap-1.5';

  const renderIcon = () => {
    switch (config.iconName) {
      case 'play': return <Play className="w-3.5 h-3.5 text-[#F6B928] fill-[#F6B928]" />;
      case 'clock': return <Clock className="w-3.5 h-3.5 text-[#2676D9]" />;
      case 'check-circle': return <CheckCircle2 className="w-3.5 h-3.5 text-[#43B96A]" />;
      case 'lock': return <Lock className="w-3.5 h-3.5 text-[#60758A]" />;
      case 'sparkles': return <Sparkles className="w-3.5 h-3.5 text-[#8059D9]" />;
      default: return null;
    }
  };

  return (
    <span className={`inline-flex items-center font-black rounded-full border-2 ${config.badgeBg} ${config.badgeText} ${config.badgeBorder} ${sizeClasses} ${className}`}>
      {renderIcon()}
      <span>{config.label}</span>
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                            PLAYER AVATAR FRAME                             */
/* -------------------------------------------------------------------------- */

export interface PlayerAvatarFrameProps {
  name: string;
  avatarText: string;
  avatarUrl?: string;
  level: number;
  status?: 'evoluindo_bem' | 'atencao' | 'intervencao' | 'pronto_avancar';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLevel?: boolean;
  className?: string;
}

export const PlayerAvatarFrame: React.FC<PlayerAvatarFrameProps> = ({
  name,
  avatarText,
  avatarUrl,
  level,
  status = 'evoluindo_bem',
  size = 'md',
  showLevel = true,
  className = '',
}) => {
  const sizeDimensions = {
    sm: 'w-10 h-10 text-base',
    md: 'w-13 h-13 text-xl',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-20 h-20 text-3xl',
  };

  const statusRing = {
    evoluindo_bem: 'border-2 border-[#2676D9] bg-[#EAF4FF]',
    pronto_avancar: 'border-2 border-[#43B96A] bg-[#EBF8F0]',
    atencao: 'border-2 border-[#F28C38] bg-[#FEF4EC]',
    intervencao: 'border-2 border-[#E85D63] bg-[#FDF0F1]',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`${sizeDimensions[size]} rounded-2xl ${statusRing[status]} p-0.5 shadow-2xs flex items-center justify-center overflow-hidden bg-white`}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full rounded-[14px] object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-[#EAF4FF] to-[#FFFFFF] rounded-[14px] flex items-center justify-center font-black text-[#2676D9]">
            {avatarText}
          </div>
        )}
      </div>

      {showLevel && (
        <div className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-lg bg-gradient-to-r from-[#2676D9] to-[#1652A3] border-2 border-white text-white font-black text-[9px] shadow-sm leading-none flex items-center gap-0.5">
          <Zap className="w-2.5 h-2.5 text-[#F6B928] fill-[#F6B928]" />
          <span>{level}</span>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                           MASCOTE EXPLORADOR GUIA                          */
/* -------------------------------------------------------------------------- */

export interface MascotGuideProps {
  message: string;
  tipTitle?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MascotGuide: React.FC<MascotGuideProps> = ({
  message,
  tipTitle = 'Dica do Explorador',
  size = 'md',
  className = '',
}) => {
  return (
    <div className={`flex items-start gap-3.5 p-4 rounded-3xl bg-[#EAF4FF] border-2 border-[#C9DDF0] ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2676D9] to-[#19B9B0] border-2 border-white shadow-md flex items-center justify-center text-2xl shrink-0">
        🧭
      </div>
      <div className="space-y-0.5 flex-1">
        <div className="text-xs font-black text-[#1652A3] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F6B928]" />
          <span>{tipTitle}</span>
        </div>
        <p className="text-xs sm:text-sm font-bold text-[#18324A] leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                         MODAL DE CONFIRMAÇÃO DO JOGO                       */
/* -------------------------------------------------------------------------- */

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'danger' | 'reward';
}

export const GameConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirmar Ação',
  cancelLabel = 'Voltar',
  variant = 'primary',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#18324A]/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white border-2 border-[#C9DDF0] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col my-auto text-left">
        {/* Header Ribbon */}
        <div className="bg-[#EAF4FF] px-6 py-4 border-b-2 border-[#C9DDF0] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-[#2676D9] uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-[#F28C38]" />
            <span>Confirmação da Missão</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-white border border-[#C9DDF0] text-[#60758A] hover:text-[#18324A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <h3 className="text-xl font-black text-[#18324A]">{title}</h3>
          <p className="text-sm text-[#60758A] leading-relaxed font-medium">
            {description}
          </p>
        </div>

        <div className="bg-[#F6FAFF] px-6 py-4 border-t-2 border-[#C9DDF0] flex items-center justify-end gap-3">
          <GameButton variant="secondary" size="md" onClick={onClose}>
            {cancelLabel}
          </GameButton>
          <GameButton 
            variant={variant === 'danger' ? 'danger' : variant === 'reward' ? 'reward' : 'primary'} 
            size="md" 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </GameButton>
        </div>
      </div>
    </div>
  );
};

