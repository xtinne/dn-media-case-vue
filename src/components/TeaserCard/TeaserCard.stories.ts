import type { Meta, StoryObj } from '@storybook/vue3'
import TeaserCard from './TeaserCard.vue'
import '@/assets/main.css'
import type { ProfileCardType } from '@/types/card.types'
import type { EmitActionType } from '@/types/action.types'

interface StoryProps extends ProfileCardType {
  action: (e: EmitActionType) => void
}

const meta = {
  title: 'Components/TeaserCard',
  component: TeaserCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['topic', 'news', 'profile', 'exclusive'],
      description: 'Type of teaser to display',
    },
    id: {
      control: 'text',
      description: 'Unique identifier for the teaser',
    },
    subtitle: {
      control: 'text',
      description: 'Small title',
    },
    title: {
      control: 'text',
      description: 'Main title',
    },
    ingress: {
      control: 'text',
      description: 'Introduction text',
    },
    category: {
      control: 'text',
      description: 'Category',
    },
    tag: {
      control: 'text',
      description: 'Additional label',
    },
    media: {
      control: 'text',
      description: 'URL to media image (news, profile and exclusive variants)',
    },
    number: {
      control: 'text',
      description: 'Display number (topic variant)',
    },
    action: {
      description: 'Action event emitted on media or content click',
      action: 'action',
    },
  },
  parameters: {
    actions: {
      handles: ['action'],
    },
  },
} satisfies Meta<typeof TeaserCard>

export default meta
type Story = StoryObj<typeof meta>

const render: Story['render'] = (args: StoryProps) => ({
  components: { TeaserCard },
  setup() {
    return { args }
  },
  template: '<TeaserCard v-bind="args" @action="(e) => args.action(e)" />',
})

export const Topic: Story = {
  render,
  args: {
    id: '1',
    variant: 'topic',
    title: 'Porteføljeforvalterens tips til hvordan du unngår «fomo» i aksjemarkedet',
    ingress: '',
    number: '4',
    tag: 'Abonnent',
    category: 'Topic',
  },
}

export const News: Story = {
  render,
  args: {
    id: '2',
    variant: 'news',
    subtitle: 'Konkurransetilsynet:',
    title: 'Nedgang på Oslo Børs før kveldens rentebeskjed fra USA',
    ingress: '',
    category: 'Finans',
    media: 'https://fakeimg.pl/1200x800?text=Placeholder&font_size=40',
  },
}

export const Profile: Story = {
  render,
  args: {
    id: '3',
    variant: 'profile',
    subtitle: 'Doblet på en måned:',
    title:
      'Slik unngår it-avdelingen å bli stående på perrongen når ledelsen tar digitalt ekspresstog inn i fremtiden.',
    ingress: '',
    category: 'Annonse',
    tag: 'Entur',
    media: 'https://fakeimg.pl/1200x800?text=Placeholder&font_size=40',
  },
}

export const Exclusive: Story = {
  render,
  args: {
    id: '4',
    variant: 'exclusive',
    title: 'Equinor har tapt over 200 milliarder kroner',
    ingress:
      'Equinor har nå gitt opp sine eierandeler i fire russiske selskaper til Rosneft etter tre måneder arbeid og mer enn ti milliarder kroner i nedskrivninger.',
    category: 'Dokumentar',
    media: 'https://fakeimg.pl/1200x800?text=Placeholder&font_size=40',
    tag: 'DN Exclusive',
  },
}

export const WithLongText: Story = {
  render,
  args: {
    ...News.args,
    ingress:
      'A very long introduction text that should be truncated according to the design specifications. When hovering over the text, it should expand to show the full content.',
  },
}
