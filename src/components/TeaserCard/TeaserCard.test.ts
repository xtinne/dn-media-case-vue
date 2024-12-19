import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TeaserCard from './TeaserCard.vue'
import type {
  NewsCardType,
  TopicCardType,
  ProfileCardType,
  ExclusiveCardType,
} from '@/types/card.types'

describe('TeaserCard', () => {
  it('renders topic variant correctly', () => {
    const wrapper = mount(TeaserCard, {
      props: {
        id: '1',
        variant: 'topic',
        title: 'Porteføljeforvalterens tips til hvordan du unngår «fomo» i aksjemarkedet',
        ingress: '',
        number: '4',
        tag: 'Abonnent',
        category: 'Topic',
      } as TopicCardType,
    })

    expect(wrapper.find('.topic-teaser').exists()).toBe(true)
    expect(wrapper.find('.topic-teaser__number').text()).toBe('4')
    expect(wrapper.find('.topic-teaser__tag').text()).includes('Abonnent')
  })

  it('renders news variant correctly', () => {
    const wrapper = mount(TeaserCard, {
      props: {
        id: '2',
        variant: 'news',
        title: 'Konkurransetilsynet:',
        ingress: 'Nedgang på Oslo Børs før kveldens rentebeskjed fra USA',
        category: 'Finans',
        media: 'https://fakeimg.pl/1200x800?text=Placeholder&font_size=40',
      } as NewsCardType,
    })

    expect(wrapper.find('.news-teaser').exists()).toBe(true)
    expect(wrapper.find('.news-teaser__category').text()).includes('Finans')
  })

  it('renders profile variant correctly', () => {
    const wrapper = mount(TeaserCard, {
      props: {
        id: '3',
        variant: 'profile',
        title: 'Doblet på en måned:',
        ingress:
          'Slik unngår it-avdelingen å bli stående på perrongen når ledelsen tar digitalt ekspresstog inn i fremtiden.',
        category: 'Annonse',
        tag: 'Entur',
        media: 'https://fakeimg.pl/1200x800?text=Placeholder&font_size=40',
      } as ProfileCardType,
    })

    expect(wrapper.find('.profile-teaser').exists()).toBe(true)
    expect(wrapper.find('.profile-teaser__tags').text()).includes('Entur')
  })

  it('renders exclusive variant correctly', () => {
    const wrapper = mount(TeaserCard, {
      props: {
        id: '4',
        variant: 'exclusive',
        title: 'Equinor har tapt over 200 milliarder kroner',
        ingress:
          'Equinor har nå gitt opp sine eierandeler i fire russiske selskaper til Rosneft etter tre måneder arbeid og mer enn ti milliarder kroner i nedskrivninger.',
        category: 'Dokumentar',
        media: 'https://fakeimg.pl/1200x800?text=Placeholder&font_size=40',
        tag: 'DN Exclusive',
      } as ExclusiveCardType,
    })

    expect(wrapper.find('.exclusive-teaser').exists()).toBe(true)
    expect(wrapper.find('.tag').text()).includes('DN Exclusive')
  })

  it('emits action events on media click', async () => {
    const wrapper = mount(TeaserCard, {
      props: {
        id: '2',
        variant: 'news',
        subtitle: 'Konkurransetilsynet:',
        title: 'Test title',
        ingress: 'Test ingress',
        media: 'https://fakeimg.pl/1200x800?text=Placeholder&font_size=40',
      } as NewsCardType,
    })

    // Force the next tick to ensure component is fully mounted
    await wrapper.vm.$nextTick()

    const mediaElement = wrapper.get('.media-button')
    await mediaElement.trigger('click')

    // Add a small delay to ensure event is processed
    await new Promise((resolve) => setTimeout(resolve, 0))

    const emitted = wrapper.emitted()
    expect(emitted).toBeTruthy()
    expect(emitted.click).toBeTruthy()
  })

  it('emits action events on title click', async () => {
    const wrapper = mount(TeaserCard, {
      props: {
        id: '1',
        variant: 'topic',
        title: 'Porteføljeforvalterens tips',
        ingress: '',
        number: '4',
      } as TopicCardType,
    })

    // Force the next tick to ensure component is fully mounted
    await wrapper.vm.$nextTick()

    const titleElement = wrapper.get('.title-button')
    await titleElement.trigger('click')

    // Add a small delay to ensure event is processed
    await new Promise((resolve) => setTimeout(resolve, 0))

    const emitted = wrapper.emitted()
    expect(emitted).toBeTruthy()
    expect(emitted.click).toBeTruthy()
  })

  it('truncates long text correctly', () => {
    const wrapper = mount(TeaserCard, {
      props: {
        id: '1',
        variant: 'news',
        title: 'A'.repeat(50),
        ingress: 'B'.repeat(150),
      } as NewsCardType,
    })

    const title = wrapper.find('.news-teaser__title h2').text()
    const ingress = wrapper.find('.news-teaser__ingress').text()

    expect(title.length).toBeLessThanOrEqual(40)
    expect(ingress.length).toBeLessThanOrEqual(120)
  })

  it('validates required props', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      mount(TeaserCard, {
        props: {
          variant: 'news',
        } as NewsCardType,
      })
    }).toThrow()

    consoleError.mockRestore()
  })
})
