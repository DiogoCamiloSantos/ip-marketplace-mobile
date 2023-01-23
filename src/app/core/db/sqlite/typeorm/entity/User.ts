import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ComboDeals } from "./ComboDeals";
import { EntityEnum } from "./EntityEnum";
import { PdvRelatedToShareOfShelfResearch } from "./PdvRelatedToShareOfShelfResearch";
import { Research } from "./Research";
import { ResearchShareOfShelf } from "./ResearchShareOfShelf";
import { ShareOfShelf } from "./ShareOfShelf";
import { Store } from "./Store";
import { StoreRoute } from "./StoreRoute";

@Entity(EntityEnum.USERS)
export class User {


  @OneToMany(() => ComboDeals, combo => combo.user)
  combos: ComboDeals[];

  @OneToMany(() => Research, research => research.user)
  researchs: Research[];
  
  @OneToMany(type => PdvRelatedToShareOfShelfResearch, pdvRelated => pdvRelated.user)
  PdvRelatedToSearch: PdvRelatedToShareOfShelfResearch[];
  
  @OneToMany(type => ResearchShareOfShelf, research => research.user)
  researchShareOfShelf: ResearchShareOfShelf[];
  
  @OneToMany(type => ShareOfShelf, research => research.user)
  shareOfShelf: ShareOfShelf[];

    @PrimaryGeneratedColumn({
        name: "id"
      })
      id: number;
    
      @Column({
        name: "name"
      })
      name: string;
    
      @Column({
        name: "username"
      })
      username: string;
    
      @Column({
        name: "password"
      })
      password: string;
    
      @Column({
        name: "last_token"
      })
      last_token: string;
    
      @Column({
        name: "userId"
      })
      userId: string;
    
      @Column({
        name: "perfilId"
      })
      perfilId: string;
    
      @Column({
        name: "perfil"
      })
      perfil: string;
    
      @Column({
        name: "expires_in"
      })
      expires_in: Date;
    
      @Column({
        name: "lastActive"
      })
      lastActive: Date;
    
      @Column({
        name: "descricaoPerfil"
      })
      descricaoPerfil: string;

    @OneToMany(type => Store, store => store.user)
    stores: Store[];

    @OneToMany(type => StoreRoute, storeRoute => storeRoute.user)
    storeRoutes: StoreRoute[];

}