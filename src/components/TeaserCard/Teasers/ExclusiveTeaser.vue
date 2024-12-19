<template>
  <article
    class="exclusive-teaser"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <button
      class="media-button"
      @click="handleMediaClick"
      :style="{ '--bg-image': `url(${media})` }"
    ></button>

    <div class="exclusive-teaser__tag">
      <span v-if="tag" class="tag">
        {{ tag }}
      </span>
    </div>

    <div class="exclusive-teaser__content">
      <span v-if="category" class="exclusive-teaser__category">
        {{ category }}
      </span>
      <div class="exclusive-teaser__text">
        <h2 class="exclusive-teaser__title">
          <button class="title-button" @click="handleTitleClick">
            {{ truncatedTitle }}
          </button>
        </h2>
        <p class="exclusive-teaser__ingress">
          {{ isHovering ? props.ingress : truncatedIngress }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ExclusiveCardType } from '@/types/card.types'
import type { EmitActionType } from '@/types/action.types'
import { truncateText } from '@/utils/truncate'
import { computed, ref } from 'vue'

const props = defineProps<ExclusiveCardType>()
const emit = defineEmits<EmitActionType>()
const isHovering = ref(false)

const truncatedTitle = computed(() => truncateText(props.title, 30))
const truncatedIngress = computed(() => truncateText(props.ingress, 120))

const handleMediaClick = () => {
  emit('action', {
    action: 'action_media',
    id: props.id,
    title: props.title,
  })
}

const handleTitleClick = () => {
  emit('action', {
    action: 'action_content',
    id: props.id,
    title: props.title,
  })
}
</script>

<style scoped>
.exclusive-teaser {
  position: relative;
  aspect-ratio: 1;
  padding: 16px;

  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;

  background-image: var(--bg-image);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.media-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-image: var(--bg-image);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  padding: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
}

.title-button {
  position: relative;
  z-index: 2;
  color: var(--color-light);
}

.exclusive-teaser__tag {
  position: relative;
  z-index: 2;

  .tag {
    background-color: var(--color-primary);
    color: var(--color-light);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    text-transform: uppercase;
  }
}

.exclusive-teaser__content {
  position: relative;
  z-index: 2;
  color: var(--color-light);
}

.exclusive-teaser__title {
  margin: 0;
  font-size: 40px;
  line-height: 1.3;
}
</style>
