import { ref, onMounted } from 'vue';

export function useSoundControl() {
  const isMuted = ref(false);

  const toggleSound = () => {
    isMuted.value = !isMuted.value;
    localStorage.setItem('soundMuted', JSON.stringify(isMuted.value));
  };

  onMounted(() => {
    const stored = localStorage.getItem('soundMuted');
    if (stored !== null) {
      isMuted.value = JSON.parse(stored);
    }
  });

  return {
    isMuted,
    toggleSound,
  };
}