import React from 'react';
import {View, ActivityIndicator,Pressable,Text,StyleSheet,FlatList} from 'react-native';
import Http from '../libs/http';
import CharacterItem from './CharacterItem';

class Character extends React.Component{
    state={
        characters:[],
        loading:false,
        next:null,
        prev:null,
    }
    componentDidMount=async()=>{
        this.setState({loading:true});
        const res=await Http.instance.get('https://rickandmortyapi.com/api/character/');
        this.setState({characters:res.results,loading:false});
        if(res.info.next){
            this.setState({next:res.info.next});
        }
        if(res.info.prev){
            this.setState({prev:res.info.prev});
        }
    }
    handleNextPress=async()=>{
        const{next}=this.state;
        this.setState({loading:true});
        const res=await Http.instance.get(next);
        console.log('Go to next Page');
        this.setState({characters:res.results,loading:false});
        if(res.info.next){
            this.setState({next:res.info.next});
        }else{
            this.setState({next:null})
        }
        if(res.info.prev){
            this.setState({prev:res.info.prev});
        }else{
            this.setState({prev:null})
        }
    }
    handlePrevPress=async()=>{
        const {prev}=this.state;
        this.setState({loading:true});
        const res=await Http.instance.get(prev);
        console.log('Go to next Page');
        this.setState({characters:res.results,loading:false});
        if(res.info.next){
            this.setState({next:res.info.next});
        }else{
            this.setState({next:null})
        }
        if(res.info.prev){
            this.setState({prev:res.info.prev});
        }else{
            this.setState({prev:null})
        }
    }
    handleCharacterPress=(character_url)=>{
        console.log(character_url)
        this.props.navigation.navigate('CharacterDetail',{character_url});

    }
    render(){
        const {characters,loading,next,prev}=this.state;
        return(
            <View style={StyleSheet.container}>
                {loading?
                <ActivityIndicator
                color='#000'
                size='large'
                style={StyleSheet.loader}>

                </ActivityIndicator>
                :null
                }
                <FlatList
                data={characters}
                renderItem={
                    ({item})=>{
                        return(
                            <View>
                                <Pressable onPress={()=>this.handleCharacterPress('https://rickandmortyapi.com/api/character/'+item.id)}>
                                    <CharacterItem item={item}></CharacterItem>
                                    </Pressable>
                                    </View>
                                    );
                                }
                            }></FlatList>
                            {prev?
                            <Pressable style={StyleSheet.btn}
                            onPress={this.handlePrevPress}>
                                <Text style={StyleSheet.btnText}>Previous</Text>
                            </Pressable>
                            :null

                            }
                            {next?
                            <Pressable style={StyleSheet.btn}
                            onPress={this.handleNextPress}>
                               <Text style={StyleSheet.btnText}>Next</Text>
                            </Pressable>
                            :null
                            }
                         </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#67dd23',
    },
    btn:{
        padding:0,
        backgroundColor:'#034246',
        height:30,
        margin:1,
    },
    btnText:{
        color:'#53eae3',
        textAlign:'center',
        fontSize:22,
    },
    loader:{
        marginTop:10,
    },
});
export default Character;