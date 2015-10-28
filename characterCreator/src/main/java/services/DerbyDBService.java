package services;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Properties;

import interfaces.iDataService;
import models.DefaultCharacter;

public class DerbyDBService implements iDataService {
	
	private String framework = "embedded";
    private String protocol = "jdbc:derby:";
    
	/**
     * <p>
     * Starts the actual demo activities. This includes creating a database by
     * making a connection to Derby (automatically loading the driver),
     * creating a table in the database, and inserting, updating and retrieving
     * some data. Some of the retrieved data is then verified (compared) against
     * the expected results. Finally, the table is deleted and, if the embedded
     * framework is used, the database is shut down.</p>
     * <p>
     * Generally, when using a client/server framework, other clients may be
     * (or want to be) connected to the database, so you should be careful about
     * doing shutdown unless you know that no one else needs to access the
     * database until it is rebooted. That is why this demo will not shut down
     * the database unless it is running Derby embedded.</p>
     *
     * @param args - Optional argument specifying which framework or JDBC driver
     *        to use to connect to Derby. Default is the embedded framework,
     *        see the <code>main()</code> method for details.
     * @see #main(String[])
     */
    public void Initialize()
    {
        System.out.println("SimpleApp starting in " + framework + " mode");
        Connection conn = null;
        Statement createCharacterTable;
        try
        {
            Properties props = new Properties(); // connection properties
            // providing a user name and password is optional in the embedded
            // and derbyclient frameworks
            props.put("user", "admin");
            props.put("password", "admin");
            String dbName = "DB";
            conn = DriverManager.getConnection(protocol + dbName
                    + ";create=true", props);
            System.out.println("Connected to and created database " + dbName);
            conn.setAutoCommit(false);
            StringBuilder tableCommand = new StringBuilder();
            tableCommand.append("create table Characters(");
            for(Field field : new DefaultCharacter().getClass().getFields())
            {
            	
            	tableCommand.append(field.getType().getName());
            }
            tableCommand.append(')');
            conn.createStatement().executeQuery(tableCommand.toString());
            
        }
        catch (SQLException sqle)
        {
        	Shutdown();
            printSQLException(sqle);
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                    conn = null;
                }
            } catch (SQLException sqle) {
                printSQLException(sqle);
            }
        }
    }
    
    public void Shutdown()
    {
		if (framework.equals("embedded"))
        {
            try
            {
                DriverManager.getConnection("jdbc:derby:;shutdown=true");
            }
            catch (SQLException se)
            {
                if (( (se.getErrorCode() == 50000)
                        && ("XJ015".equals(se.getSQLState()) ))) {
                    // we got the expected exception
                    System.out.println("Derby shut down normally");
                    // Note that for single database shutdown, the expected
                    // SQL state is "08006", and the error code is 45000.
                } else {
                    // if the error code or SQLState is different, we have
                    // an unexpected exception (shutdown failed)
                    System.err.println("Derby did not shut down normally");
                    printSQLException(se);
                }
            }
        }
    }
    
    /**
     * Reports a data verification failure to System.err with the given message.
     *
     * @param message A message describing what failed.
     */
    private void reportFailure(String message) {
        System.err.println("\nData verification failed:");
        System.err.println('\t' + message);
    }

    /**
     * Prints details of an SQLException chain to <code>System.err</code>.
     * Details included are SQL State, Error code, Exception message.
     *
     * @param e the SQLException from which to print details.
     */
    public static void printSQLException(SQLException e)
    {
        // Unwraps the entire exception chain to unveil the real cause of the
        // Exception.
        while (e != null)
        {
            System.err.println("\n----- SQLException -----");
            System.err.println("  SQL State:  " + e.getSQLState());
            System.err.println("  Error Code: " + e.getErrorCode());
            System.err.println("  Message:    " + e.getMessage());
            // for stack traces, refer to derby.log or uncomment this:
            //e.printStackTrace(System.err);
            e = e.getNextException();
        }
    }


	public void GetCharacter(Object item) {
		// TODO Auto-generated method stub
		
	}

	public void PostCharacter(Object item) {
		// TODO Auto-generated method stub
		
	}

	public void PutCharacter(Object item) {
		// TODO Auto-generated method stub
		
	}

	public void DeleteCharacter(Object item) {
		// TODO Auto-generated method stub
		
	}
}
