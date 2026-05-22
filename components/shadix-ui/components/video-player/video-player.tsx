'use client';
import type React from 'react';

import '@/components/video-player.css';

import { VideoPlayerBuffer } from '@/components/shadix-ui/components/video-player/video-player-buffer';
import { VideoPlayerControls } from '@/components/shadix-ui/components/video-player/video-player-controls';
import { VideoPlayerIndicator } from '@/components/shadix-ui/components/video-player/video-player-indicator';
import { VideoPlayerProgressBar } from '@/components/shadix-ui/components/video-player/video-player-progress-bar';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { cn } from '@/lib/utils/classes-merge';
import { useEffect, useState } from 'react';
import {
    IconMaximize as Maximize,
    IconMinimize as Minimize,
    IconPlayerPause as Pause,
    IconPlayerPlay as Play,
    IconVolume as Volume1,
    IconVolume2,
    IconVolume3 as VolumeOff,
} from '@tabler/icons-react';
import StyledIcon from '@/components/styled-icon';

export interface VideoPlayerProps {
    /** @public (required) Source of the video */
    src:
        | string
        | {
              '2160p'?: string;
              '1440p'?: string;
              '1080p'?: string;
              '720p'?: string;
              '480p'?: string;
              '360p'?: string;
              '240p'?: string;
          };
    /** @public (optional) Whether to autoplay the video */
    autoPlay?: boolean;
    /** @public (optional) Thumbnail image for the video */
    thumbnail?: string;
    /** @public (optional) Time at which to display the thumbnail */
    thumbnailTime?: number;
    /** @public (optional) Subtitles for the video */
    subtitles?: {
        src: string;
        lang: string;
        label: string;
    }[];
    className?: string;
    height?: string;
    cover?: boolean;
    isThumbnail?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    subtitles,
    src,
    autoPlay = false,
    thumbnail,
    thumbnailTime,
    className,
    cover,
    isThumbnail = false,
}) => {
    const {
        playerRef,
        containerRef,
        playing,
        indicator,
        isBuffering,
        volume,
        muted,
        progress,
        displayThumb,
        loadedProgress,
        isFullscreen,
        toggleFullscreen,
        handleProgress,
        handlePlay,
        handlePause,
        handlePlayPause,
        handleVolumeChange,
        handleWaiting,
        handleCanPlay,
        seek,
        setMuted,
    } = useVideoPlayer({
        src,
        autoPlay,
        thumbnail,
        thumbnailTime,
    });

    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const video = playerRef.current;

        if (!video) return;

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    return (
        <div className={cn('w-full h-full bg-primary/10 overflow-hidden rounded-lg', className)}>
            <div ref={containerRef} className="relative flex h-full w-full items-center justify-center">
                <video
                    ref={isThumbnail ? undefined : playerRef}
                    src={src as string}
                    className={cn('max-h-full max-w-full ', cover ? 'object-cover w-full' : 'object-contain')}
                    controls={false}
                    poster={displayThumb || undefined}
                    crossOrigin="anonymous"
                    onTimeUpdate={isThumbnail ? undefined : handleProgress}
                    onLoadedMetadata={isThumbnail ? undefined : handleProgress}
                    onPlay={isThumbnail ? undefined : handlePlay}
                    onPause={isThumbnail ? undefined : handlePause}
                    onClick={isThumbnail ? undefined : handlePlayPause}
                    onWaiting={isThumbnail ? undefined : handleWaiting}
                    onCanPlay={isThumbnail ? undefined : handleCanPlay}
                    onCanPlayThrough={isThumbnail ? undefined : handleCanPlay}
                    muted={muted}
                >
                    <track kind="captions" srcLang="en" label="English" />
                    {subtitles?.map((sub) => (
                        <track key={`${sub.src}-${sub.lang}`} src={sub.src} kind="captions" label={sub.label} srcLang={sub.lang} />
                    ))}
                </video>

                {!isThumbnail ? (
                    <>
                        <VideoPlayerBuffer isBuffering={isBuffering} />

                        <VideoPlayerIndicator indicator={indicator} playing={playing} />

                        <VideoPlayerProgressBar
                            progress={progress}
                            loadedProgress={loadedProgress}
                            playerRef={playerRef as React.RefObject<HTMLVideoElement>}
                            duration={duration}
                            onSeek={seek}
                        />

                        <VideoPlayerControls
                            playing={playing}
                            volume={volume}
                            muted={muted}
                            isFullscreen={isFullscreen}
                            toggleFullscreen={toggleFullscreen}
                            onPlayPause={handlePlayPause}
                            onVolumeChange={handleVolumeChange}
                            onMuteToggle={() => setMuted(!muted)}
                        />
                    </>
                ) : (
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
                        <StyledIcon Icon={Play} className="bg-white/80" />
                    </div>
                )}
            </div>
        </div>
    );
};

export { VideoPlayer };
