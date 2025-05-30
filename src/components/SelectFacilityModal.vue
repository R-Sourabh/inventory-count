<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal()">
          <ion-icon slot="icon-only" :icon="close" />
        </ion-button>
      </ion-buttons>
      <ion-title>{{ translate("Select facility") }}</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-searchbar id="facilitySearchBar" @keyup.enter="queryString = $event.target.value; filterFacilities()" />
    <div class="empty-state" v-if="!filteredFacilities.length">
      <p>{{ translate("No facilities found") }}</p>
    </div>
    <ion-list v-else>
      <ion-radio-group v-model="selectedFacilityId">
        <ion-item v-for="facility in filteredFacilities" :key="facility.facilityId">
          <ion-radio :value="facility.facilityId" label-placement="end" justify="start">
            <ion-label>
              {{ facility.facilityName }}
              <p>{{ facility.facilityId }}</p>
            </ion-label>
          </ion-radio>
        </ion-item>
      </ion-radio-group>
    </ion-list>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="updateFacility()" :disabled="!isFacilityUpdated">
        <ion-icon :icon="saveOutline" />
      </ion-fab-button>
    </ion-fab>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  modalController
} from "@ionic/vue";
import { computed, defineProps, onMounted, ref } from "vue";
import { close, saveOutline } from "ionicons/icons";
import { translate } from "@/i18n"
import { useUserStore } from "@hotwax/dxp-components";

const userStore = useUserStore();

const props = defineProps(["currentCycleCount"])

const facilities = computed(() => userStore.getFacilites)

const isFacilityUpdated = computed(() => {
  return props.currentCycleCount.facilityId !== selectedFacilityId.value
})

let filteredFacilities = ref([] as Array<any>)
let queryString = ref("")
let selectedFacilityId = ref("")

onMounted(() => {
  filteredFacilities.value = facilities.value
  selectedFacilityId.value = props.currentCycleCount.facilityId
})

function closeModal(value = "") {
  modalController.dismiss({ value })
}

function filterFacilities() {
  if(queryString.value.trim()) {
    filteredFacilities.value = facilities.value.filter((facility: any) => facility.facilityName?.toLowerCase().includes(queryString.value.toLowerCase()) || facility.facilityId.toLowerCase().includes(queryString.value.toLowerCase()))
  } else {
    filteredFacilities.value = facilities.value
  }
}

function updateFacility() {
  closeModal(selectedFacilityId.value)
}
</script>

<style scoped>
ion-content {
  --padding-bottom: 80px;
}
</style>