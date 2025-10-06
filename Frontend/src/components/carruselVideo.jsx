"use client";

import { useState, useCallback, useMemo, memo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink, Volume2, VolumeX } from "lucide-react";

// Configuración de videos optimizada
const VIDEOS_DATA = [
  {
    id: "sig-project",
    thumbnail: "/assets/sig.jpg",
    url: "https://www.youtube.com/embed/nZTCakPbKG0?si=2JIixPdFhb1PN9Yb",
    videoId: "_9s-gaPMEvM",
    title: "Sistema de Información Geográfica",
    description: "Desarrollo de aplicación SIG para análisis territorial y gestión de datos geoespaciales.",
    category: "Topografía",
    duration: "3:45",
    color: "emerald",
    gradient: "from-emerald-500/30 via-green-500/20 to-emerald-600/30"
  },
  {
    id: "web-dev-project", 
    thumbnail: "/assets/Cover_web.png",
    url: "https://www.youtube.com/embed/dCkPToMO8-M?si=Br2Xz_ntUC5x5mTC",
    videoId: "_9s-gaPMEvM",
    title: "Plataforma Web Administrativa",
    description: "Aplicación web completa con React, Node.js y base de datos optimizada.",
    category: "Desarrollo Web",
    duration: "4:12",
    color: "blue",
    gradient: "from-blue-500/30 via-cyan-500/20 to-blue-600/30"
  },
  {
    id: "road-design-project",
    thumbnail: "https://damassets.autodesk.net/content/dam/autodesk/www/products/autodesk-autocad-civil-3d/fy25/features/key-features-of-civil-3d-2025-thumb-1920x1080.jpg",
    url: "https://www.youtube.com/embed/_n_lUYCM-2M",
    videoId: "_9s-gaPMEvM",
    title: "Diseño Geométrico de Vías",
    description: "Proyecto de diseño vial con software especializado y análisis de tránsito.",
    category: "Ingeniería Civil",
    duration: "5:28",
    color: "purple",
    gradient: "from-purple-500/30 via-violet-500/20 to-purple-600/30"
  }
  /*{
    id: "mobile-app-project",
    thumbnail: "https://i.pinimg.com/736x/2c/f5/c6/2cf5c6a8332a22bf6f06c32f32b5b6f0.jpg",
    url: "https://www.youtube.com/embed/_9s-gaPMEvM",
    videoId: "_9s-gaPMEvM",
    title: "Aplicación Móvil de Levantamiento",
    description: "App móvil para levantamiento topográfico con GPS integrado y sincronización en tiempo real.",
    category: "Desarrollo Móvil",
    duration: "2:56",
    color: "orange",
    gradient: "from-orange-500/30 via-amber-500/20 to-orange-600/30"
  }/**/
];

// Configuraciones de animación optimizadas
const ANIMATION_CONFIGS = {
  slideTransition: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.8
  },
  hoverScale: {
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Configuración de colores mejorada para modo light y dark
const COLOR_CONFIGS = {
  emerald: {
    primary: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-500/20",
    border: "border-emerald-300 dark:border-emerald-500/40",
    glow: "shadow-emerald-500/30",
    indicator: "bg-emerald-500 border-emerald-600 shadow-emerald-500/50",
    indicatorInactive: "bg-gray-300 dark:bg-white/40 hover:bg-emerald-200 dark:hover:bg-white/60 border-gray-400 dark:border-white/30"
  },
  blue: {
    primary: "text-blue-600 dark:text-blue-400", 
    bg: "bg-blue-100 dark:bg-blue-500/20",
    border: "border-blue-300 dark:border-blue-500/40",
    glow: "shadow-blue-500/30",
    indicator: "bg-blue-500 border-blue-600 shadow-blue-500/50",
    indicatorInactive: "bg-gray-300 dark:bg-white/40 hover:bg-blue-200 dark:hover:bg-white/60 border-gray-400 dark:border-white/30"
  },
  purple: {
    primary: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-500/20", 
    border: "border-purple-300 dark:border-purple-500/40",
    glow: "shadow-purple-500/30",
    indicator: "bg-purple-500 border-purple-600 shadow-purple-500/50",
    indicatorInactive: "bg-gray-300 dark:bg-white/40 hover:bg-purple-200 dark:hover:bg-white/60 border-gray-400 dark:border-white/30"
  },
  orange: {
    primary: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-500/20",
    border: "border-orange-300 dark:border-orange-500/40", 
    glow: "shadow-orange-500/30",
    indicator: "bg-orange-500 border-orange-600 shadow-orange-500/50",
    indicatorInactive: "bg-gray-300 dark:bg-white/40 hover:bg-orange-200 dark:hover:bg-white/60 border-gray-400 dark:border-white/30"
  }
};

// Componente de botón de navegación mejorado
const NavigationButton = memo(({ direction, onClick, disabled, isVideoPlaying }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`absolute top-1/2 ${direction === 'prev' ? 'left-4' : 'right-4'} -translate-y-1/2 
               bg-white/90 dark:bg-black/70 hover:bg-emerald-100 dark:hover:bg-emerald-600/80 
               backdrop-blur-md text-gray-800 dark:text-white p-3 rounded-full 
               border border-gray-300 dark:border-white/20 shadow-xl transition-all duration-300 z-30
               disabled:opacity-50 disabled:cursor-not-allowed group
               ${isVideoPlaying ? 'opacity-75 hover:opacity-100' : ''}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    {direction === 'prev' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </motion.button>
));

NavigationButton.displayName = 'NavigationButton';

// Componente de indicador mejorado
const Indicator = memo(({ index, isActive, onClick, video }) => {
  const colorConfig = COLOR_CONFIGS[video.color] || COLOR_CONFIGS.emerald;
  
  return (
    <motion.button
      onClick={() => onClick(index)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className={`relative w-5 h-5 rounded-full transition-all duration-300 border-2 shadow-lg ${
        isActive 
          ? `${colorConfig.indicator}` 
          : `${colorConfig.indicatorInactive}`
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className={`absolute inset-1 rounded-full bg-white animate-pulse`}
        />
      )}
    </motion.button>
  );
});

Indicator.displayName = 'Indicator';

// Componente del reproductor de video integrado mejorado
const IntegratedVideoPlayer = memo(({ video, isPlaying, onPlay, onStop }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colorConfig = COLOR_CONFIGS[video.color] || COLOR_CONFIGS.emerald;

  const handlePlayClick = useCallback(() => {
    if (isPlaying) {
      onStop();
    } else {
      setIsLoading(true);
      onPlay();
    }
  }, [isPlaying, onPlay, onStop]);

  const openInYouTube = useCallback(() => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
    window.open(youtubeUrl, '_blank');
  }, [video.videoId]);

  if (isPlaying) {
    const embedUrl = `${video.url}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&enablejsapi=1`;
    
    return (
      <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
        {/* Controles del video */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
          <motion.button
            onClick={openInYouTube}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 bg-red-600/90 hover:bg-red-700 text-white text-sm rounded-lg font-semibold transition-colors duration-200 backdrop-blur-sm"
          >
            <ExternalLink size={16} />
            YouTube
          </motion.button>
          <motion.button
            onClick={onStop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm"
          >
            <Pause size={16} />
            Cerrar
          </motion.button>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="text-center text-white">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg font-semibold">Cargando video...</p>
            </div>
          </div>
        )}

        {/* YouTube iframe */}
        <iframe
          src={embedUrl}
          title={video.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayClick}
    >
      {/* Miniatura de YouTube */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover transition-all duration-700"
        style={{ filter: 'brightness(0.85) contrast(1.1)' }}
      />
      
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/50" />
      
      {/* Botón de play central */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full shadow-2xl border-4 border-white/20 backdrop-blur-sm transition-all duration-300"
        >
          <Play size={32} className="text-white ml-1" fill="currentColor" />
        </motion.div>
      </motion.div>
      
      {/* Información del video con mejor contrasto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${colorConfig.bg} ${colorConfig.primary} border ${colorConfig.border} 
                           shadow-lg backdrop-blur-sm`}>
              {video.category}
            </span>
            <span className="text-white font-semibold text-sm bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
              {video.duration}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-white drop-shadow-lg">
            {video.title}
          </h3>
          
          <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">
            {video.description}
          </p>
        </div>
      </motion.div>
      
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
});

IntegratedVideoPlayer.displayName = 'IntegratedVideoPlayer';

// Componente principal del slide de video
const VideoSlide = memo(({ video, isActive, isPlaying, onPlay, onStop }) => {
  return (
    <motion.div
      layout
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${video.gradient} rounded-2xl`}
      whileHover={!isPlaying ? ANIMATION_CONFIGS.hoverScale : {}}
    >
      <IntegratedVideoPlayer 
        video={video} 
        isPlaying={isPlaying}
        onPlay={onPlay}
        onStop={onStop}
      />
    </motion.div>
  );
});

VideoSlide.displayName = 'VideoSlide';

// Componente principal del carrusel mejorado
const OptimizedVideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  
  const currentVideo = useMemo(() => VIDEOS_DATA[currentIndex], [currentIndex]);
  const isCurrentVideoPlaying = playingVideo === currentVideo.id;
  
  const navigateTo = useCallback((index) => {
    // Si hay un video reproduciéndose, lo pausamos al cambiar de slide
    if (playingVideo) {
      setPlayingVideo(null);
    }
    setCurrentIndex(index);
  }, [playingVideo]);

  const prevSlide = useCallback(() => {
    if (playingVideo) {
      setPlayingVideo(null);
    }
    setCurrentIndex(prev => prev === 0 ? VIDEOS_DATA.length - 1 : prev - 1);
  }, [playingVideo]);

  const nextSlide = useCallback(() => {
    if (playingVideo) {
      setPlayingVideo(null);
    }
    setCurrentIndex(prev => prev === VIDEOS_DATA.length - 1 ? 0 : prev + 1);
  }, [playingVideo]);

  const playCurrentVideo = useCallback(() => {
    setPlayingVideo(currentVideo.id);
  }, [currentVideo.id]);

  const stopCurrentVideo = useCallback(() => {
    setPlayingVideo(null);
  }, []);

  return (
    <section className="py-16 bg-transparent dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header con mejor contraste */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-lg">
            Mis <span className="text-emerald-600 dark:text-emerald-400 drop-shadow-lg">Proyectos</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto drop-shadow-md">
            Explora algunos de mis trabajos más destacados en desarrollo web, topografía y sistemas de información geográfica.
          </p>
        </motion.div>

        {/* Carrusel principal */}
        <div className="relative">
          <motion.div
            layout
            className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl 
                      border border-gray-200 dark:border-white/10 
                      bg-white/50 dark:bg-black/20 backdrop-blur-xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={ANIMATION_CONFIGS.slideTransition}
                className="w-full h-full"
              >
                <VideoSlide 
                  video={currentVideo}
                  isActive={true}
                  isPlaying={isCurrentVideoPlaying}
                  onPlay={playCurrentVideo}
                  onStop={stopCurrentVideo}
                />
              </motion.div>
            </AnimatePresence>

            {/* Botones de navegación mejorados */}
            <NavigationButton 
              direction="prev" 
              onClick={prevSlide}
              disabled={VIDEOS_DATA.length <= 1}
              isVideoPlaying={isCurrentVideoPlaying}
            />
            <NavigationButton 
              direction="next" 
              onClick={nextSlide}
              disabled={VIDEOS_DATA.length <= 1}
              isVideoPlaying={isCurrentVideoPlaying}
            />
          </motion.div>

          {/* Indicadores mejorados */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {VIDEOS_DATA.map((video, index) => (
              <Indicator
                key={video.id}
                index={index}
                isActive={index === currentIndex}
                onClick={navigateTo}
                video={video}
              />
            ))}
          </div>

          {/* Thumbnails navegables mejorados */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {VIDEOS_DATA.map((video, index) => (
              <motion.div
                key={video.id}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => navigateTo(index)}
                className={`relative h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 
                          bg-transparent dark:bg-transparent shadow-lg ${
                  index === currentIndex 
                    ? `${COLOR_CONFIGS[video.color]?.border || 'border-emerald-500'} shadow-lg ${COLOR_CONFIGS[video.color]?.glow}` 
                    : 'border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40'
                }`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <Play size={16} className="text-white mx-auto mb-1 drop-shadow-lg" fill="currentColor" />
                    <h4 className="text-white text-xs font-bold px-2 leading-tight drop-shadow-lg">
                      {video.title}
                    </h4>
                  </div>
                </div>
                {/* Indicador de reproducción activa mejorado */}
                {playingVideo === video.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg border border-white/50"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(OptimizedVideoCarousel);