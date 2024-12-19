<template>
  <main>
    <div class="teaser-grid">
      <TeaserCard
        id="1"
        variant="topic"
        title="Porteføljeforvalterens tips til hvordan du unngår «fomo» i aksjemarkedet"
        ingress=""
        number="4"
        tag="Abonnent"
        category="Topic"
        @action="handleAction"
      />

      <TeaserCard
        id="2"
        variant="news"
        subtitle="Konkurransetilsynet:"
        title="Nedgang på Oslo Børs før kveldens rentebeskjed fra USA"
        ingress=""
        category="Finans"
        media="https://fakeimg.pl/1200x800?text=Placeholder&font_size=40"
        @action="handleAction"
      />

      <TeaserCard
        id="3"
        variant="profile"
        subtitle="Doblet på en måned:"
        title="Slik unngår it-avdelingen å bli stående på perrongen når ledelsen tar digitalt ekspresstog inn i fremtiden."
        ingress=""
        category="Annonse"
        tag="Entur"
        media="https://fakeimg.pl/1200x800?text=Placeholder&font_size=40"
        @action="handleAction"
      />

      <TeaserCard
        id="4"
        variant="exclusive"
        title="Equinor har tapt over 200 milliarder kroner"
        ingress="Equinor har nå gitt opp sine eierandeler i fire russiske selskaper til Rosneft etter tre måneder arbeid og mer enn ti milliarder kroner i nedskrivninger."
        category="Dokumentar"
        media="https://fakeimg.pl/1200x800?text=Placeholder&font_size=40"
        tag="DN Exclusive"
        @action="handleAction"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import TeaserCard from './components/TeaserCard/TeaserCard.vue'

const handleAction = (payload: {
  action: 'action_media' | 'action_content'
  id: string
  title: string
}) => {
  if (payload.action === 'action_media') {
    console.log('Media clicked:', payload.id, payload.title)
  } else if (payload.action === 'action_content') {
    console.log('Content clicked:', payload.id, payload.title)
  }
}
</script>

<style>
.teaser-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style>
