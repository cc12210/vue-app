import Tabs from './tabs/Tabs'
import TabItem from './tabs/TabItem'
import Header from './header/header'
import Content from './content/Content'
import SelectCity from './selectCity'
import Vue from 'vue'

export default {
    install() {
        Vue.component(Tabs.name, Tabs);
        Vue.component(TabItem.name, TabItem);
        Vue.component(Header.name, Header);
        Vue.component(Content.name, Content);
        Vue.component(SelectCity.name, SelectCity);
    }
}