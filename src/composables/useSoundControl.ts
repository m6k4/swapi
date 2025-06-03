import { ref, onMounted } from 'vue';

const isMuted = ref(false);

export function useSoundControl() {
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