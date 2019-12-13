export interface BookMore {
  id: Number;
  name: String;
  price: String;
  priceCombo: String;
  propertyType: Number;
  total: Number;
  totalRemain: Number;
  totalRent: Number;
}

export interface School {
  address: String;
  name: String;
  id: String;
}

export interface Package {
  description: String;
  kindPackage: String;
  id: String;
  name: String;
  packageType: String;
  price: String;
  priority: String;
  packageProperties: Array<PackageProperties>;
  properties: Array<Properties>;
}

export interface PackageProperties {
  propertyId: String;
  id: String;
}

export interface Properties {
  id: String;
  name: String;
  price: String;
  priceCombo: String;
  propertyType: String;
  total:  String;
  totalRemain: String;
  totalRent: String;
}

export class NewContract {
  bookMoreOptions: Array<BookMore>;
  schools: Array<School>;
  packages: Array<Package>;

  constructor(data: any) {
    this.bookMoreOptions =  data.properties ? data.properties.map((item: any) => {
      return {
        id: item.id || '',
        name: item.name || '',
        price: item.price || '',
        priceCombo: item.price_combo || '',
        propertyType: item.property_type || '',
        total: item.total || '',
        totalRemain: item.total_remain || '',
        totalRent: item.total_rent || '',
      };
    }) : [];

    this.schools = data.schools ? data.schools.map((item: any) => {
      return {
        address: item.address || '',
        id: item.id || '',
        name: item.name || '',
      };
    }) : [];

    this.packages = data.packages ? data.packages.map((item: any) => {
      return {
        description: item.description,
        kindPackage: item.kind_package,
        id: item.id,
        name: item.name,
        packageType: item.package_type,
        price: item.price,
        priority: item.priority,
        packageProperties: item.package_properties ? item.package_properties.map((packagePropertie: any) => {
          return {
            propertyId: packagePropertie.property_id,
            id: packagePropertie.id
          };
        }) : [],
        properties: item.properties ? item.properties.map((properties: any) => {
          return {
            id: properties.id,
            name: properties.name,
            price: properties.price,
            priceCombo: properties.price_combo,
            propertyType: properties.property_type,
            total: properties.total,
            totalRemain: properties.total_remain,
            totalRent: properties.total_rent
          };
        }) : [],
      };
    }) : [];
  }
}
