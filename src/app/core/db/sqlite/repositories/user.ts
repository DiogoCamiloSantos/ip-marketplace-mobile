import { Injectable } from "@angular/core";
import { User } from "@dbentities/User";
import { StorageEnum } from "@models/enum";
import { ProfileResponse } from "@models/profile";
import { AuthenticationProvider } from "@providers/authentication/authentication";
import { StorageProvider } from "@providers/storage/storage";
import { DataSource, Repository } from "typeorm";
import { OrmProvider } from "../typeorm/orm/orm";

@Injectable()
export class UserRepository extends Repository<User> {
  private connection: DataSource;
  private repository: Repository<User>;

  constructor(
    private orm: OrmProvider,
    private auth: AuthenticationProvider,
    private storage: StorageProvider
  ) {
    super(User, orm.getConnectionAsync().createEntityManager());
    this.initRepository().then();
  }

  public async findOneByUserId(userId: string): Promise<User> {
    try {
      await this.initRepository();

      return this.repository.findOne({
        where: {
          userId
        }
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public saveAccount(user: User): Promise<User> {
    try {
      return this.repository.save(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public updateProfile(profileResponse: ProfileResponse) {
    try {
      if (!profileResponse) return Promise.resolve(true);

      let user: User = this.storage.get<User>(StorageEnum.AUTH);
      user.descricaoPerfil = profileResponse.Descricao;
      this.storage.set(StorageEnum.AUTH, user);

      return this.repository
        .createQueryBuilder()
        .update(User)
        .set({
          descricaoPerfil: profileResponse.Descricao
        })
        .where("id = :id", { id: this.auth.user.id })
        .execute();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async initRepository() {
    this.connection = await this.manager.connection;
    this.repository = await this.connection.getRepository(User);
  }
}
