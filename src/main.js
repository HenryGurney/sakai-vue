import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Toast from "primevue/toast"; // Import Toast component
import SelectButton from "primevue/selectbutton"; // Import component globally
import StyleClass from "primevue/styleclass"; // Import StyleClass directive

import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";

import '@/assets/styles.scss';
import '@/assets/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.component("Toast", Toast); // Register Toast component globally
app.use(ConfirmationService);
app.component("SelectButton", SelectButton); // Register component globally
app.directive("styleclass", StyleClass); // Register StyleClass directive globally

// Register PrimeVue Components Globally
app.component("InputText", InputText);
app.component("Password", Password);
app.component("Checkbox", Checkbox);
app.component("Button", Button);

app.mount('#app');
