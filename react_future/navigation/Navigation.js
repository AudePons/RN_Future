import { createStackNavigator, createAppContainer } from 'react-navigation'
import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            header: null,
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

export default createAppContainer(SearchStackNavigator)