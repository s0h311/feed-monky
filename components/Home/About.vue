<template>
  <div
    id="about"
    class="space-y-20"
  >
    <UIHeroWithMultipleImages
      title="We make technology make your life easier."
      text="
      We are passionate about simplifying your life through software.
      We believe technology should empower, not complicate.
      That's why we develop user-friendly solutions with your needs at heart, putting the joy of creation back into your hands.
    "
      :images="[
        'annie-spratt-MChSQHxGZrQ.jpg',
        'brooke-cagle-g1Kr4Ozfoac.jpg',
        'disruptivo-iQ15DTx-63k.jpg',
        'jason-goodman-fznQW-kn5VU.jpg',
        'surface-coCGW4SsxX4.jpg',
      ]"
    />

    <UIOurTeamList
      title="Our Team"
      text="Tons of creativity and passion. We love tech and the thrill."
      :people="[
        {
          name: 'Soheil Nazari',
          image: 'picture-soheil-cropped.png',
          link: 'https://soheilnazari.de',
        },
        {
          name: 'Maximilian Buchmann',
          image: 'person-placeholder.png',
        },
        {
          name: 'Fahram Tehrani',
          image: 'person-placeholder.png',
        },
      ]"
    />
  </div>
</template>
