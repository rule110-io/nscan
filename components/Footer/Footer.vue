<template>
  <footer class="footer">
    <mq-layout :mq="['sm', 'md']">
      <FooterBlobsMobile class="footer__overlay" />
    </mq-layout>
    <mq-layout mq="lg">
      <FooterBlobs class="footer__overlay" />
    </mq-layout>
    <div class="footer__wrapper">
      <StartMining />
      <div class="footer__nav">
        <div class="footer__description">
          <div class="footer__description-title">
            <Logo class="footer__description-logo" />New Kind of Network
          </div>
          <div class="footer__description-text">{{ $t('nknDescription') }}</div>
          <div class="footer__description-socials">
            <a
              v-for="social in socials"
              :key="social.url"
              :href="social.url"
              target="_blank"
              class="footer__description-social"
            >
              <component :is="social.icon"></component>
            </a>
          </div>
        </div>

        <div class="footer__nav-item">
          <div class="footer__nav-title">{{ $t("company") }}</div>
          <a
            class="footer__nav-link"
            href="https://www.nkn.org/#/about"
            target="_blank"
          >{{ $t("about") }}</a>
          <a
            class="footer__nav-link"
            href="https://www.nkn.org"
            target="_blank"
          >{{ $t("officialWebsite") }}</a>
        </div>
        <div class="footer__nav-item">
          <div class="footer__nav-title">{{ $t("otherHelpfulTools") }}</div>
          <a
            class="footer__nav-link"
            href="https://www.nknx.org"
            target="_blank"
          >{{ $t("nknxNodeManager") }}</a>
          <a class="footer__nav-link" href="http://nstatus.org" target="_blank">{{ $t("nStatus") }}</a>
          <a
            class="footer__nav-link"
            href="https://vault.rule110.io"
            target="_blank"
          >{{ $t("nknxVault") }}</a>
          <a
            class="footer__nav-link"
            href="https://vanity.nknx.org"
            target="_blank"
          >{{ $t("nknxVanity") }}</a>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__bottom-item">
          © NKN Explorer {{ $moment().format('YYYY') }}.
          {{ $t('allRightsReserved') }}.
        </div>
        <div class="footer__bottom-item footer__coded">
          Coded with
          <span class="fe fe-heart footer__heart"></span> by rule110
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
@import './Footer';
</style>

<script>

import Logo from '@/assets/icons/logo.svg'
import Twitter from '@/assets/icons/twitter.svg'
import Telegram from '@/assets/icons/telegram.svg'
import Medium from '@/assets/icons/medium.svg'
import Discord from '@/assets/icons/discord.svg'
import FooterBlobs from '@/assets/icons/footer-blobs.svg'
import FooterBlobsMobile from '@/assets/icons/footer-blobs-mobile.svg'
import StartMining from '~/components/StartMining/StartMining'

export default {
  components: {
    StartMining,
    Logo,
    Twitter,
    Telegram,
    Medium,
    Discord,
    FooterBlobs,
    FooterBlobsMobile
  },

  data: () => {
    return {
      socials: [
        { icon: 'Twitter', url: 'https://twitter.com/NKN_ORG' },
        { icon: 'Telegram', url: 'https://t.me/nknorg' },
        { icon: 'Medium', url: 'https://medium.com/nknetwork' },
        { icon: 'Discord', url: 'https://discord.gg/fvK2Egm' }
      ]
    }
  }
}
</script>
