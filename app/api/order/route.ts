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
  ginItems: DrinkItem[];
  mixItems: DrinkItem[];
}

export async function GET() {
  try {
    const menuFilePath = path.join(process.cwd(), "data", "menu.json");
    const deviceFilePath = path.join(process.cwd(), "data", "device.json");

    // 메뉴와 디바이스 파일 읽기
    const menuData = await fs.readFile(menuFilePath, "utf8");
    const deviceData = await fs.readFile(deviceFilePath, "utf8");

    // JSON 파싱
    const menu: DrinkItem[] = JSON.parse(menuData);
    const device: DeviceData = JSON.parse(deviceData);

    // 사용 가능한 음료 리스트
    const availableDrinks = device.availableDrinks;

    // 칵테일 분류
    const filteredDrinks: FilteredDrinks = {
      vodkaItems: [],
      rumItems: [],
      ginItems: [],
      mixItems: [],
    };

    // 필터링 로직
    menu.forEach((item) => {
      const canMake = Object.keys(item.ingredients).every((ingredient) => {
        const normalizedIngredient = ingredient.toLowerCase();

        // 가니시(garnish)와 얼음(ice)는 무조건 통과
        if (
          normalizedIngredient === "garnish" ||
          normalizedIngredient === "ice"
        ) {
          return true;
        }

        // 나머지는 availableDrinks에 포함되어야 통과
        return availableDrinks.includes(normalizedIngredient);
      });

      if (canMake) {
        // 음료 재료에 따라 분류
        if (
          Object.keys(item.ingredients).some(
            (ingredient) => ingredient.toLowerCase() === "vodka"
          )
        ) {
          filteredDrinks.vodkaItems.push(item);
        } else if (
          Object.keys(item.ingredients).some(
            (ingredient) => ingredient.toLowerCase() === "white_rum"
          )
        ) {
          filteredDrinks.rumItems.push(item);
        } else if (
          Object.keys(item.ingredients).some(
            (ingredient) => ingredient.toLowerCase() === "gin"
          )
        ) {
          filteredDrinks.ginItems.push(item);
        } else {
          filteredDrinks.mixItems.push(item);
        }
      }
    });

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
