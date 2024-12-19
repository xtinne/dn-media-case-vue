<template>
  <article class="news-teaser" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
    <button v-if="media" class="media-button" @click="handleMediaClick">
      <img :src="media" :alt="title" />
    </button>
    <div class="news-teaser__content">
      <div class="news-teaser__title">
        <button class="title-button" @click="handleTitleClick">
          <h5 class="news-teaser__subtitle">{{ subtitle }}</h5>
          <h2>{{ truncatedTitle }}</h2>
        </button>
        <p class="news-teaser__ingress">
          {{ isHovering ? props.ingress : truncatedIngress }}
        </p>
      </div>
      <div class="news-teaser__tags">
        <span v-if="category" class="news-teaser__category">
          {{ category }}
        </span>
        <span v-if="category && tag">|</span>
        <span v-if="tag" class="news-teaser__tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { truncateText } from '@/utils/truncate'
import type { NewsCardType } from '@/types/card.types'
import type { EmitActionType } from '@/types/action.types'

const props = defineProps<NewsCardType>()
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
.news-teaser {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  border-bottom: 1px solid var(--color-border);
}

.news-teaser__media {
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.news-teaser__content {
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
}

.news-teaser__tags {
  display: flex;
  gap: 8px;
  font-size: 11px;
  text-transform: uppercase;
}

.news-teaser__subtitle {
  font-size: 10px;
  font-weight: 500;
  margin: 0;
}
</style>
