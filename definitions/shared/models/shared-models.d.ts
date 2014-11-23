/** 
 * Interface descriptions for models that are shared among server and client.
 */ 

/** 
 * Base interface for all models. Grows organically as we find more needs to use it.
 */
interface Model {
  _id: string;
  last_modification_date: number;
}

interface Platform extends Model {

}

interface Review extends Model {
  /**
   * Score. Defined between 0-5.
   */
  score: number;

  /** 
   * Review title.
   */
  title: string;

  /** 
   * Details on the Review.
   */
  details: string;
}

/** 
 * Progress details for a game.
 */
interface Progress extends Model {
  /** 
   * Status indication on is the game still in progress or already finished.
   * [ "NOT_STARTED", "IN_PROGRESS", "FINISHED", "WILL_NEVER_FINISH" ]
   */
  finished: string;
}

/**
 * Interface for the Game document.
 */
interface Game extends Model {
  /**
   * Name of the game. Should never contain anything but the relevant. 
   * For example: Super Mario Bros, Crash Bandicoot 3 and so on.
   */
  name: string;

  /** 
   * Release Year.
   */ 
  date?: number;

  /** 
   * Description for the game. 
   */
  description?: string;

  /** 
   * Game can have multiple genres.
   */
  genres?: Genre[];

  /** 
   * Single Game can exist on multiple platforms
   */
  platforms: Platform[];

  /**
   * Review of the game.
   */
  review?: Review;
}

/** 
 * Interface for the Collection documents. 
 */
interface Collection extends Model {
  games: Game[];
}

/**
 * Interface for the User documents.
 */
interface User extends Model {
  collections: Collection[];
  // information: string;
  
}

