import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { content, type GalleryPhoto } from './data/content';

// Komponen-komponen UI & Seksi
import { WelcomeScreen } from './components/WelcomeScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { InteractiveCake } from './components/InteractiveCake';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { ScratchCardSection } from './components/ScratchCardSection';
import { ClosingSection } from './components/ClosingSection';
import { FallingHearts } from './components/ui/FallingHearts';
import { Lightbox } from './components/ui/Lightbox';

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle masuk dari Welcome Screen ("Buka Kejutan")
  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6; // Volume awal yang nyaman
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay diblokir atau gagal diputar:", err);
          setIsPlaying(false);
        });
    }
  };

  // Toggle Play / Pause Audio
  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error("Gagal memutar audio:", e));
    }
  };

  // Toggle Mute / Unmute Audio
  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  // Scroll ke area kue jika tombol 'Tiup Lilin Lagi' di klik
  const handleReblowCandle = () => {
    const cakeElement = document.getElementById('cake-section');
    if (cakeElement) {
      cakeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update mute status jika audio tag sudah siap
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="relative min-h-screen bg-pastel-cream text-romantic-dark overflow-x-hidden">
      {/* Element Audio tersembunyi untuk musik latar */}
      <audio
        ref={audioRef}
        src={content.audio.songUrl}
        loop
        preload="auto"
      />

      {/* 1. LAYAR PEMBUKA ("BUKA KEJUTAN") */}
      <AnimatePresence>
        {!hasEntered && (
          <WelcomeScreen
            title={content.welcomeScreen.title}
            subtitle={content.welcomeScreen.subtitle}
            buttonText={content.welcomeScreen.buttonText}
            onEnter={handleEnter}
          />
        )}
      </AnimatePresence>

      {/* 2. AUDIO CONTROLLER & PARTIKEL HATI (MUNCUL SETELAH MASUK) */}
      {hasEntered && (
        <>
          <FallingHearts />
          <AudioPlayer
            songTitle={content.audio.songTitle}
            isPlaying={isPlaying}
            isMuted={isMuted}
            onTogglePlay={handleTogglePlay}
            onToggleMute={handleToggleMute}
          />
        </>
      )}

      {/* 3. LIGHTBOX FOTO GALERI (MODAL FULLSCREEN) */}
      <Lightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {/* 4. KONTEN UTAMA APLIKASI */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          greeting={content.hero.greeting}
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          scrollButtonText={content.hero.scrollButtonText}
        />

        {/* Interactive Cake Section */}
        <InteractiveCake
          title={content.cakeSection.title}
          subtitle={content.cakeSection.subtitle}
          manualBlowButtonText={content.cakeSection.manualBlowButtonText}
          micBlowButtonText={content.cakeSection.micBlowButtonText}
          micInstruction={content.cakeSection.micInstruction}
          wishTitle={content.cakeSection.wishTitle}
          wishMessage={content.cakeSection.wishMessage}
        />

        {/* Timeline Section */}
        <TimelineSection
          title={content.timelineSection.title}
          subtitle={content.timelineSection.subtitle}
          moments={content.timelineSection.moments}
        />

        {/* Gallery Section */}
        <GallerySection
          title={content.gallerySection.title}
          subtitle={content.gallerySection.subtitle}
          photos={content.gallerySection.photos}
          onSelectPhoto={setSelectedPhoto}
        />

        {/* Love Letter Section */}
        <LoveLetterSection
          title={content.loveLetterSection.title}
          salutation={content.loveLetterSection.salutation}
          paragraphs={content.loveLetterSection.paragraphs}
          signature={content.loveLetterSection.signature}
        />

        {/* Scratch Card Section */}
        <ScratchCardSection
          title={content.scratchCardSection.title}
          subtitle={content.scratchCardSection.subtitle}
          scratchInstruction={content.scratchCardSection.scratchInstruction}
          revealedTitle={content.scratchCardSection.revealedTitle}
          revealedMessage={content.scratchCardSection.revealedMessage}
          actionText={content.scratchCardSection.actionText}
        />

        {/* Closing Section */}
        <ClosingSection
          title={content.closingSection.title}
          message={content.closingSection.message}
          reblowButtonText={content.closingSection.reblowButtonText}
          backToTopButtonText={content.closingSection.backToTopButtonText}
          onReblowCandle={handleReblowCandle}
        />
      </main>
    </div>
  );
};

export default App;
