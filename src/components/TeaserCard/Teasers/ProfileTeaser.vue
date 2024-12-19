<template>
  <article class="profile-teaser" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
    <div class="profile-teaser__tags">
      <span v-if="category">
        {{ category }}
      </span>
      <span v-if="category && tag">|</span>
      <span v-if="tag">
        {{ tag }}
      </span>
    </div>
    <button v-if="media" class="media-button" @click="handleMediaClick">
      <img :src="media" :alt="title" />
    </button>
    <div class="profile-teaser__content">
      <button class="title-button" @click="handleTitleClick">
        <h5 class="profile-teaser__subtitle">{{ subtitle }}</h5>
        <h2>
          {{ truncatedTitle }}
        </h2>
      </button>
      <p class="profile-teaser__ingress">
        {{ isHovering ? props.ingress : truncatedIngress }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { truncateText } from '@/utils/truncate'
import type { ProfileCardType } from '@/types/card.types'
import type { EmitActionType } from '@/types/action.types'

const props = defineProps<ProfileCardType>()
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
.profile-teaser {
  background-color: var(--color-background-soft);
  padding: 16px;
  height: fit-content;
}

.profile-teaser__tags {
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.profile-teaser__media {
  aspect-ratio: 2/1;
}

.profile-teaser__subtitle {
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 4px;
}
</style>
