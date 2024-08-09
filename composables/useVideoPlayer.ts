export const useVideoPlayer = () => {
  const videoPlayer = useState<null | any>('videoPlayer', () => null)

  return videoPlayer
}
