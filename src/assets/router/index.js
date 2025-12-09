import { createRouter, createWebHistory } from "vue-router";
import ProductView from "@/views/ProductView.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/producto/:id", component: ProductView }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
