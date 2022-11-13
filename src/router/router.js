import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/pages/homeMarvel.vue";
import Comics from "@/components/pages/comicsMarvel";
import Characters from "@/components/pages/charactersMarvel";
import Comic from "@/components/pages/specificComic.vue";
import Character from "@/components/pages/specificCharacter.vue";
import Event from "@/components/pages/specificEvent.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/comics",
        name: "Comics",
        component: Comics,
    },
    {
        path: "/characters",
        name: "Characters",
        component: Characters,
    },
    {
        path: "/comic:id",
        name: "Comic",
        component: Comic,
    },
    {
        path: "/character:id",
        name: "Character",
        component: Character,
    },
    {
        path: "/Event:id",
        name: "Event",
        component: Event,
    },
];

    const router = createRouter({
        history: createWebHistory(),
        routes,
    });
    
    export default router;