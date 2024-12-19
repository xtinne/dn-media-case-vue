<template>
  <component :is="teaserComponent" v-bind="props" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TopicTeaser from './Teasers/TopicTeaser.vue'
import NewsTeaser from './Teasers/NewsTeaser.vue'
import ProfileTeaser from './Teasers/ProfileTeaser.vue'
import ExclusiveTeaser from './Teasers/ExclusiveTeaser.vue'
import type { TopicCardType } from '@/types/card.types'
import type { ExclusiveCardType } from '@/types/card.types'
import type { ProfileCardType } from '@/types/card.types'
import type { NewsCardType } from '@/types/card.types'

const props = defineProps<NewsCardType | ProfileCardType | ExclusiveCardType | TopicCardType>()

const teaserComponent = computed(() => {
  switch (props.variant) {
    case 'topic':
      return TopicTeaser
    case 'profile':
      return ProfileTeaser
    case 'exclusive':
      return ExclusiveTeaser
    case 'news':
    default:
      return NewsTeaser
  }
})
</script>
