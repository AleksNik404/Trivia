import imagesDataURL from '../assets/json/images.json';

interface IMultiLangString {
  ru: string;
  en: string;
}

interface IPictureData {
  year: number;
  picture: number;
  author: IMultiLangString;
  name: IMultiLangString;
}

interface IImageDto {
  year: string;
  picture: string;
  author: IMultiLangString;
  name: IMultiLangString;
}

export interface ICategoryData {
  name: string;
  picture: string;
  score?: boolean[];
}

type IImagesDto = Record<string, IImageDto>;

export class QuizDataModel {
  data: IPictureData[];

  constructor() {}

  public async build() {
    this.data = await this.loadImagesData(imagesDataURL);

    return this;
  }

  public getCategoriesData() {
    const questionsPerCategory = 10;
    const categoriesCount = Math.floor(this.data.length / questionsPerCategory);
    const categories: ICategoryData[] = [];
    for (let i = 0; i < categoriesCount; i += 1) {
      const pictureUrl = `./public/img/pictures/${i * questionsPerCategory}.jpg`;
      const categoryData: ICategoryData = {
        name: i.toString(),
        picture: pictureUrl,
        score: Array(categoriesCount).fill(false),
      };
      categories.push(categoryData)
    }
    return categories;
  }

  private loadImagesData(url: string): Promise<IPictureData[]> {
    return fetch(url)
      .then((res) => res.json())
      .then((imagesData: IImagesDto) => {
        const modelData: Array<IPictureData> = Object.keys(imagesData).map((it) => {
          const item = imagesData[it];
          const record: IPictureData = {
            year: Number(item.year),
            picture: Number(item.picture),
            author: item.author,
            name: item.name,
          };
          return record;
        });
        return modelData;
      });
  }
}
