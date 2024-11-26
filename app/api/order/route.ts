import path from "path";
import { promises as fs } from "fs";

interface DrinkItem {
  cocktail: string;
  name: string;
  abv: number;
  ingredients: Record<string, number | boolean | string>;
  imageSrc: string;
}

interface DeviceData {
  availableDrinks: string[];
}

interface FilteredDrinks {
  vodkaItems: DrinkItem[];
  rumItems: DrinkItem[];
  mixItems: DrinkItem[];
}

export async function GET() {
  try {
    // 파일 경로 설정
    const menuFilePath = path.join(process.cwd(), "data", "menu.json");
    const deviceFilePath = path.join(process.cwd(), "data", "device.json");

    // JSON 파일 읽기
    const menuData = await fs.readFile(menuFilePath, "utf8");
    const deviceData = await fs.readFile(deviceFilePath, "utf8");

    const menu: DrinkItem[] = JSON.parse(menuData);
    const device: DeviceData = JSON.parse(deviceData);

    const availableDrinks = device.availableDrinks;

    // 칵테일 분류
    const filteredDrinks: FilteredDrinks = {
      vodkaItems: [],
      rumItems: [],
      mixItems: [],
    };

    menu.forEach((item) => {
      const canMake = Object.keys(item.ingredients).every((ingredient) =>
        availableDrinks.includes(ingredient)
      );

      if (canMake) {
        if (item.cocktail.toLowerCase().includes("vodka")) {
          filteredDrinks.vodkaItems.push(item);
        } else if (item.cocktail.toLowerCase().includes("rum")) {
          filteredDrinks.rumItems.push(item);
        } else {
          filteredDrinks.mixItems.push(item);
        }
      }
    });

    // 데이터 반환
    return new Response(JSON.stringify(filteredDrinks), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing order API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process order data" }),
      { status: 500 }
    );
  }
}
