
/**
 * تحويل الوقت بالثواني إلى تنسيق دقائق:ثواني
 */
export const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) {
    return '00:00';
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  // إضافة صفر إلى الأرقام الأحادية
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
  return `${formattedMinutes}:${formattedSeconds}`;
};
