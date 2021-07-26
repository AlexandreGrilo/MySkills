import React, { useState, useEffect } from 'react';
import { 
    Platform,
    StyleSheet,
    View,
    Text,
    TextInput,
    FlatList
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';


interface SkillData {
  id: string;
  name: string;
}


export function Home() {

  // ### PROPERTIES ###

  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  // ### FUNCTIONS ###

  function handleAddNewSkill() {

    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    };
    
    setMySkills(oldSkills => [...oldSkills, data]);
  }


  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

  // ### EFFECTS ###

  useEffect(() => {
      const currentHour = new Date().getHours();

      if(currentHour < 12)
        setGreeting('Good morning');
      else if(currentHour >= 12 && currentHour < 18)
        setGreeting('Good afternoon');
      else {
          setGreeting('Good night');
      }

  }, []);

  // ### RETURN VIEW ###

  return(
    <View style={styles.container}>
      <Text style={styles.title}>
          Welcome, Alexandre
      </Text>

      <Text style={styles.greeting}>
          {greeting}
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder='New Skill'
        placeholderTextColor='#555'
        onChangeText={setNewSkill}
      />

      <Button 
        title='Add'
        onPress={handleAddNewSkill} 
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
          My Skills
      </Text>

      <FlatList 
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <SkillCard 
              skill={item.name}
              onPress={() => handleRemoveSkill(item.id)}
            />
        )}
      />
      
    </View>
  )
}

// ### STYLES ###

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  greeting: {
      color: '#FFF'
  },
  input: {
      backgroundColor: '#1F1E25',
      color: '#FFF',
      fontSize: 18,
      padding: Platform.OS === 'ios' ? 15 : 10,
      marginTop: 30,
      borderRadius: 7
  }
});