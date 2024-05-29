import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Mapa from "./pages/mapa/map";
import Temperatura from "./pages/temperatura/temperatura";

const Pilha = createStackNavigator(); // Defina Pilha como createStackNavigator()

export default function Routers() {
    return (
        <NavigationContainer>
            <Pilha.Navigator>
                <Pilha.Screen
                    name="Mapa"
                    component={Mapa}
                    options={{ headerShown: false }}
                />
                <Pilha.Screen
                    name="Temperatura"
                    component={Temperatura}
                    options={{ headerShown: false }}
                />
            </Pilha.Navigator>
        </NavigationContainer>
    );
}
