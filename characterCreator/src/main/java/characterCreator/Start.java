package characterCreator;

import interfaces.iDataService;
import services.DerbyDBService;

public class Start {
	private static iDataService DBService = new DerbyDBService();
	public static void main(String[] args) {
		DBService.Initialize();
	}
}
