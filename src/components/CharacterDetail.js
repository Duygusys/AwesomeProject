import React from 'react';
import {View,Activityındicator,Text,FlatList,StyleSheet,Image} from 'react-native';
import Http from'../libs/http';

class CharacterDetail extends React.Component{
    state={
        loading:false,
        character:null,
        episodes:[],
    }
    componentDidMount=async()=>{
      this.setState({loading:true});
      const res=await Http.instance.get(this.props.route.params.character_url);
      this.setState({character:res});
      const {character}=this.state
      if(character){
          let episodes_info=[]
          for(let i in character.episode){
              episodes_info.push(await Http.instance.get(character.episode[i]));
          }
          this.setState({episodes:episodes_info})
      }
      this.setState({loading:false});
    }
    render(){
        const {character,loading,episodes}=this.state;
        return(
            <View>
                {character?
                <View style={StyleSheet.container}>
                    <Image source={{uri:character.image}}
                    style={StyleSheet.image}></Image>
                    <View style={StyleSheet.description}>
                        <Text style={StyleSheet.text}>Name:{character.name}</Text>
                        <Text style={StyleSheet.text}>Gender:{character.gender}</Text>
                        <Text style={StyleSheet.text}>Specie:{character.species}</Text>
                        <Text style={StyleSheet.text}>Origin Location:{character.origin.name}</Text>
                        <Text style={StyleSheet.text}>Current Location:{character.location.name}</Text>
                    </View>
            </View>
            :null
        }
        {loading?
        <ActivityIndicator
        color='#005'
        size='large'
        style={StyleSheet.loader}>

        </ActivityIndicator>
        :
        <FlatList
        style={StyleSheet.episode_list}
        data={episodes}
        renderItem={
            ({item})=><Text style={StyleSheet.text}>{item.name}</Text>

        }>
            </FlatList>
        }
        </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'50%',
        backgroundColor:'#67dd23',

        alignItems:'center'
    },
    description:{
        padding:20,
        marginTop:20,
        backgroundColor:'#67dd23',
        alignItems:'center'
    },
    episode_list:{
        padding:20,
        backgroundColor:'#000',
        width:'100%'
    },
    loader:{
        marginTop:10,
    },
    image:{
        marginTop:20,
        width:'50%',
        height:'50%',
    },
    text:{
        fontSize:17,
        color:'#53eae3',
    }
});
export default CharacterDetail;

