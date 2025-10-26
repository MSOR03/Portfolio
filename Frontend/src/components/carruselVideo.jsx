"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from "lucide-react";

// Configuración de videos
const VIDEOS_DATA = [
  {
    id: "sig-project",
    thumbnail: "/assets/sig.avif",
    url: "https://www.youtube.com/embed/nZTCakPbKG0?si=2JIixPdFhb1PN9Yb",
    videoId: "nZTCakPbKG0",
    title: "Sistema de Información Geográfica",
    description: "Desarrollo de aplicación SIG para análisis territorial y gestión de datos geoespaciales.",
    category: "Geomatica",
    duration: "3:45",
    color: "emerald",
    gradient: "from-emerald-500/30 via-green-500/20 to-emerald-600/30"
  },
  {
    id: "web-dev-project", 
    thumbnail: "/assets/Cover_web.avif",
    url: "https://www.youtube.com/embed/dCkPToMO8-M?si=Br2Xz_ntUC5x5mTC",
    videoId: "dCkPToMO8-M",
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
    videoId: "_n_lUYCM-2M",
    title: "Diseño Geométrico de Vías",
    description: "Proyecto de diseño vial con software especializado y análisis de tránsito.",
    category: "Ingeniería Civil",
    duration: "5:28",
    color: "purple",
    gradient: "from-purple-500/30 via-violet-500/20 to-purple-600/30"
  }
];

// Colores para badges y botones
const COLOR_CONFIGS = {
  emerald: {
    badge: "bg-emerald-500/90 text-white border-emerald-400/50",
    border: "border-emerald-500/60",
    glow: "shadow-emerald-500/40",
    indicator: "bg-emerald-500 border-emerald-400 shadow-emerald-500/60"
  },
  blue: {
    badge: "bg-blue-500/90 text-white border-blue-400/50", 
    border: "border-blue-500/60",
    glow: "shadow-blue-500/40",
    indicator: "bg-blue-500 border-blue-400 shadow-blue-500/60"
  },
  purple: {
    badge: "bg-purple-500/90 text-white border-purple-400/50",
    border: "border-purple-500/60",
    glow: "shadow-purple-500/40",
    indicator: "bg-purple-500 border-purple-400 shadow-purple-500/60"
  }
};

// Botón de navegación
const NavigationButton = memo(({ direction, onClick, disabled }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`absolute top-1/2 ${direction === 'prev' ? 'left-4' : 'right-4'} -translate-y-1/2 
               bg-white/95 dark:bg-black/80 hover:bg-emerald-50 dark:hover:bg-emerald-600/80 
               backdrop-blur-md text-gray-900 dark:text-white p-3 rounded-full 
               border border-gray-300 dark:border-white/30 shadow-xl transition-all duration-300 z-30
               disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {direction === 'prev' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </motion.button>
));

NavigationButton.displayName = 'NavigationButton';

// Indicador
const Indicator = memo(({ index, isActive, onClick, video }) => {
  const colorConfig = COLOR_CONFIGS[video.color];
  
  return (
    <motion.button
      onClick={() => onClick(index)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className={`relative w-5 h-5 rounded-full transition-all duration-300 border-2 shadow-lg ${
        isActive 
          ? colorConfig.indicator
          : 'bg-gray-300 dark:bg-white/40 hover:bg-gray-400 dark:hover:bg-white/60 border-gray-500 dark:border-white/50'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-1 rounded-full bg-white animate-pulse"
        />
      )}
    </motion.button>
  );
});

Indicator.displayName = 'Indicator';

// Reproductor de video
const IntegratedVideoPlayer = memo(({ video, isPlaying, onPlay, onStop }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colorConfig = COLOR_CONFIGS[video.color];

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
        {/* Controles superiores */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
          <motion.button
            onClick={openInYouTube}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 bg-red-600/95 hover:bg-red-700 text-white text-sm rounded-lg font-semibold transition-colors duration-200 backdrop-blur-sm shadow-lg"
          >
            <ExternalLink size={16} />
            YouTube
          </motion.button>
          <motion.button
            onClick={onStop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 bg-black/80 hover:bg-black/90 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm shadow-lg"
          >
            <Pause size={16} />
            Cerrar
          </motion.button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10">
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
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
      {/* Miniatura */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover transition-all duration-700"
        style={{ filter: 'brightness(0.8)' }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/60" />
      
      {/* Botón play */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.15 : 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full shadow-2xl border-4 border-white/30 backdrop-blur-sm transition-all duration-300"
        >
          <Play size={32} className="text-white ml-1" fill="currentColor" />
        </motion.div>
      </motion.div>
      
      {/* Información - SIEMPRE EN BLANCO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${colorConfig.badge} border shadow-lg backdrop-blur-sm`}>
              {video.category}
            </span>
            <span className="!text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/20">
              {video.duration}
            </span>
          </div>
          
          <h3 className="text-xl font-bold !text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {video.title}
          </h3>
          
          <p className="text-sm leading-relaxed !text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {video.description}
          </p>
        </div>
      </motion.div>
      
      {/* Efecto brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
});

IntegratedVideoPlayer.displayName = 'IntegratedVideoPlayer';

// Slide de video
const VideoSlide = memo(({ video, isPlaying, onPlay, onStop }) => {
  return (
    <motion.div
      layout
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${video.gradient} rounded-2xl`}
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

// Carrusel principal
const OptimizedVideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  
  const currentVideo = useMemo(() => VIDEOS_DATA[currentIndex], [currentIndex]);
  const isCurrentVideoPlaying = playingVideo === currentVideo.id;
  
  const navigateTo = useCallback((index) => {
    if (playingVideo) setPlayingVideo(null);
    setCurrentIndex(index);
  }, [playingVideo]);

  const prevSlide = useCallback(() => {
    if (playingVideo) setPlayingVideo(null);
    setCurrentIndex(prev => prev === 0 ? VIDEOS_DATA.length - 1 : prev - 1);
  }, [playingVideo]);

  const nextSlide = useCallback(() => {
    if (playingVideo) setPlayingVideo(null);
    setCurrentIndex(prev => prev === VIDEOS_DATA.length - 1 ? 0 : prev + 1);
  }, [playingVideo]);

  const playCurrentVideo = useCallback(() => {
    setPlayingVideo(currentVideo.id);
  }, [currentVideo.id]);

  const stopCurrentVideo = useCallback(() => {
    setPlayingVideo(null);
  }, []);

  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
  Mis <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-500 dark:to-blue-500" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Proyectos</span>
</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Explora algunos de mis trabajos más destacados en desarrollo web, topografía y sistemas de información geográfica.
          </p>
        </motion.div>

        {/* Carrusel */}
        <div className="relative">
          <motion.div
            layout
            className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl 
                      border border-gray-300 dark:border-white/10 
                      bg-white/50 dark:bg-black/20 backdrop-blur-xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full h-full"
              >
                <VideoSlide 
                  video={currentVideo}
                  isPlaying={isCurrentVideoPlaying}
                  onPlay={playCurrentVideo}
                  onStop={stopCurrentVideo}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navegación */}
            <NavigationButton 
              direction="prev" 
              onClick={prevSlide}
              disabled={VIDEOS_DATA.length <= 1}
            />
            <NavigationButton 
              direction="next" 
              onClick={nextSlide}
              disabled={VIDEOS_DATA.length <= 1}
            />
          </motion.div>

          {/* Indicadores */}
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

          {/* Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {VIDEOS_DATA.map((video, index) => (
              <motion.div
                key={video.id}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => navigateTo(index)}
                className={`relative h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 shadow-lg ${
                  index === currentIndex 
                    ? `${COLOR_CONFIGS[video.color].border} ${COLOR_CONFIGS[video.color].glow}` 
                    : 'border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40'
                }`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center px-2">
                    <Play size={16} className="text-white mx-auto mb-1" fill="currentColor" />
                    <h4 className="text-white text-xs font-bold leading-tight drop-shadow-lg">
                      {video.title}
                    </h4>
                  </div>
                </div>
                {playingVideo === video.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
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