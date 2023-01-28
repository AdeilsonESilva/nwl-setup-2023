import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import * as ExpoNotifications from "expo-notifications";

import { BackButton } from "../components/BackButton";

export function Notifications() {
  async function scheduleNotification() {
    const trigger = new Date(Date.now());
    trigger.setMinutes(trigger.getMinutes() + 1);

    await ExpoNotifications.scheduleNotificationAsync({
      content: {
        title: "Olá, Adeilson! 🤯",
        body: "Você praticou seus hábitos hoje?",
      },
      trigger,
    });
  }

  async function getAllScheduledNotifications() {
    const schedules =
      await ExpoNotifications.getAllScheduledNotificationsAsync();

    console.log("schedules", schedules);
  }

  async function deleteAllScheduledNotifications() {
    await ExpoNotifications.cancelAllScheduledNotificationsAsync();
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Notificações
        </Text>

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={scheduleNotification}
        >
          <Feather name="plus" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">Nova</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-blue-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={getAllScheduledNotifications}
        >
          <Feather name="clock" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Agendadas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-red-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={deleteAllScheduledNotifications}
        >
          <Feather name="trash" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Excluir
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
