import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../theme/ThemeProvider";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  Text,
  TextInput,
  Switch,
  Checkbox,
  Dialog,
  Portal,
  FAB,
  Divider,
  Avatar,
} from "react-native-paper";
import { useStyles } from "./styles";
import Navbar from "@/app/components/navbar";

type HomeScreenNavigationProp = StackNavigationProp<any>;

export default function ReactNativePaper() {
  const router = useRouter();
  const { theme } = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const styles = useStyles(theme);
  const { t } = useTranslation();

  const [text, setText] = useState("");
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: t("homeScreen.screenName"),
    });
  }, [navigation, t]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <ScrollView style={styles.container}>
      <Navbar showBackButton />
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Title
            title={t("reactNativePaper.welcome")}
            subtitle="Material Design"
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="folder"
                color={theme.colors.primary}
                style={{ backgroundColor: theme.colors.surface }}
              />
            )}
          />
          <Card.Content>
            <Text style={styles.title}>{t("reactNativePaper.subtitle")}</Text>
            <TextInput
              label="Example Input"
              value={text}
              onChangeText={(text) => setText(text)}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: { background: theme.customColors.inputBackground },
              }}
            />
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={showDialog}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Show Dialog
            </Button>
          </Card.Actions>
        </Card>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Switch
            value={isSwitchOn}
            onValueChange={() => setSwitchOn(!isSwitchOn)}
            color={theme.colors.primary}
          />
          <Text style={styles.text}>Switch: {isSwitchOn ? "On" : "Off"}</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
            color={theme.colors.primary}
          />
          <Text style={styles.text}>
            Checkbox: {checked ? "Checked" : "Unchecked"}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Example Dialog</Dialog.Title>
            <Dialog.Content>
              <Text>This is an example of a Dialog component.</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          {t("back")}
        </Button>
        <FAB
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          icon="plus"
          label="Add"
          onPress={() => console.log("FAB Pressed")}
        />
      </View>
    </ScrollView>
  );
}
