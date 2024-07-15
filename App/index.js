// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Workout Tracker</Text>
            <WorkoutList />
        </SafeAreaView>
    );
};

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch workout data
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                    messages: [
                        { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                        { role: "user", content: "List some common workouts with name, description, and category." }
                    ],
                    model: "gpt-4o"
                });
                const { data } = response;
                const workoutResponse = JSON.parse(data.response);
                setWorkouts(workoutResponse);
            } catch (error) {
                console.error('Error fetching workout data:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {workouts.map((workout, index) => (
                <View key={index} style={styles.workoutBox}>
                    <Text style={styles.workoutTitle}>{workout.name}</Text>
                    <Text style={styles.workoutCategory}>{workout.category}</Text>
                    <Text style={styles.workoutDescription}>{workout.description}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    workoutBox: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    workoutTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    workoutCategory: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    workoutDescription: {
        fontSize: 14,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;