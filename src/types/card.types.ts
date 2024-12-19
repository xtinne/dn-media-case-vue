type CardTypes = {
  id: string | number
  title: string
  ingress: string
  category?: string
  tag?: string
}

export type TopicCardType = CardTypes & {
  number?: string
  variant: 'topic'
}

export type ProfileCardType = CardTypes & {
  media?: string
  subtitle?: string
  variant: 'profile'
}

export type NewsCardType = CardTypes & {
  media?: string
  subtitle?: string
  variant: 'news'
}

export type ExclusiveCardType = CardTypes & {
  media?: string
  variant: 'exclusive'
}
