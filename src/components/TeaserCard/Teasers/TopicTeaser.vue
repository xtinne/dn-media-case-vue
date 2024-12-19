<template>
  <article class="topic-teaser" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
    <div class="topic-teaser__number">{{ number }}</div>
    <div class="topic-teaser__content">
      <h2 class="topic-teaser__title">
        <button @click="handleTitleClick" class="title-button">
          {{ truncatedTitle }}
        </button>
      </h2>
      <p class="topic-teaser__ingress">
        {{ isHovering ? props.ingress : truncatedIngress }}
      </p>
      <div class="topic-teaser__tags">
        <span v-if="category">
          {{ category }}
        </span>
        <span v-if="category && tag">|</span>
        <span v-if="tag" class="topic-teaser__tag tag-abonnent">
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { truncateText } from '@/utils/truncate'
import type { TopicCardType } from '@/types/card.types'
import type { EmitActionType } from '@/types/action.types'

const props = defineProps<TopicCardType>()
const emit = defineEmits<EmitActionType>()
const isHovering = ref(false)

const truncatedTitle = computed(() => truncateText(props.title, 30))
const truncatedIngress = computed(() => truncateText(props.ingress, 120))

const handleTitleClick = () => {
  emit('action', {
    action: 'action_content',
    id: props.id,
    title: props.title,
  })
}
</script>

<style scoped>
.topic-teaser {
  background: var(--color-background-mute);
  padding: 24px;
  display: grid;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  gap: 24px;
}

.topic-teaser__number {
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.1;
}

.topic-teaser__tags {
  display: flex;
  gap: 8px;
  color: var(--color-text-muted);
  font-size: 13px;
  margin-top: 20px;
  text-transform: uppercase;
}
</style>
