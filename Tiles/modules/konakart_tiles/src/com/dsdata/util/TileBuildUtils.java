//
// (c) 2015 DS Data Systems UK Ltd, All rights reserved.
//
// DS Data Systems and KonaKart and their respective logos, are 
// trademarks of DS Data Systems UK Ltd. All rights reserved.
//
// The information in this document is the proprietary property of
// DS Data Systems UK Ltd. and is protected by English copyright law,
// the laws of foreign jurisdictions, and international treaties,
// as applicable. No part of this document may be reproduced,
// transmitted, transcribed, transferred, modified, published, or
// translated into any language, in any form or by any means, for
// any purpose other than expressly permitted by DS Data Systems UK Ltd.
// in writing.
//

package com.dsdata.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

/**
 * Utilities used to build the tiles
 */
public class TileBuildUtils
{

    private static String logFile = null;

    /**
     * Explains usage
     */
    static final String usage = "Usage: TileBuildUtils     \n"
            + "                        command       eg. create-single-js \n"
            + "                       -i             input-filename or directory \n"
            + "                       -o             output-filename             \n";

    /*
     * Update to add all javaScript files that should be added to the minimized KonaKart javaScript
     * file. Don't remove ../gensrc/script/kk-template-gen.js since this is a generated file
     * containing all of the templates.
     */
    private static final String[] jsFileArray = new String[]
    { "../gensrc/script/kk-template-gen.js", "kk-configure.js", "kk-dateFormat.js",
            "i18n/kk-en_GB.js", "i18n/kk-currencies.js", "kk-tile.js", "kk-prodTile.js",
            "kk-productsTile.js", "kk-cartTile.js", "kk-wishListTile.js", "kk-carouselTile.js",
            "kk-verticalCarouselTile.js", "kk-reviewsTile.js", "kk-formTiles.js",
            "kk-loginTile.js", "kk-registerTile.js", "kk-accountTile.js",
            "kk-customerInfoTiles.js", "kk-onePageCheckoutTile.js", "kk-orderDetailTile.js",
            "kk-ordersTile.js", "kk-router.js", "kk-store.js" };

    /*
     * Update to add all css files that should be added to the minimized KonaKart css file
     */
    private static final String[] cssFileArray = new String[]
    { "kk-tile.css", "kk-prodTile.css", "kk-reviewsTile.css", "kk-productsTile.css",
            "kk-facetsTile.css", "kk-catMenuTile.css", "kk-searchTile.css", "kk-cartTile.css",
            "kk-wishListTile.css", "kk-carouselTile.css", "kk-verticalCarouselTile.css",
            "kk-formTiles.css", "kk-loginTile.css", "kk-registerTile.css", "kk-accountTile.css",
            "kk-customerInfoTiles.css", "kk-onePageCheckoutTile.css", "kk-orderDetailTile.css",
            "kk-ordersTile.css", "kk-breadcrumbsTile.css" };

    /*
     * HTML files that we don't process
     */
    private static final String[] htmlFileArray = new String[]
    { "demo.html" };

    /**
     * @param args
     */
    public static void main(String[] args)
    {
        String command = args[0];
        String inputFilename = null;
        String outputFilename = null;

        if (args.length < 2)
        {
            System.out.println("Insufficient arguments:\n\n" + usage);
            return;
        }

        for (int a = 1; a < args.length; a++)
        {
            if (args[a].equals("-i"))
            {
                inputFilename = args[a + 1];
                a++;
            } else if (args[a].equals("-o"))
            {
                outputFilename = args[a + 1];
                a++;
            } else
            {
                System.out.println("Unknown argument: " + args[a] + "\n" + usage);
                return;
            }
        }

        try
        {
            if (command.equals("create-single-js"))
            {
                TileBuildUtils.createJS(inputFilename, outputFilename);
            } else if (command.equals("create-single-css"))
            {
                TileBuildUtils.createCSS(inputFilename, outputFilename);
            } else if (command.equals("create-template-js"))
            {
                TileBuildUtils.createTemplateJS(inputFilename, outputFilename);
            } else if (command.equals("process-html"))
            {
                TileBuildUtils.processHTMLFiles(inputFilename, outputFilename, null);
            } else if (command.equals("process-html-remote"))
            {
                TileBuildUtils.processHTMLFiles(inputFilename, outputFilename,
                        "http://www.konakart.com/konakart_tiles/gensrc");
            } else
            {
                System.out.println("Unknown command: " + command + "\n" + usage);
                return;
            }
        } catch (IOException e)
        {
            e.printStackTrace();
        }
    }

    /**
     * Copies the html files from dirIn to dirOut, modifying the includes to include only the
     * generated JS and CSS files. It removes all of the includes that were required during
     * development.
     * 
     * @param dirIn
     * @param dirOut
     * @param baseURL
     * @throws IOException
     */
    public static void processHTMLFiles(String dirIn, String dirOut, String baseURL)
            throws IOException
    {
        File fIn = new File(dirIn);
        if (!fIn.exists() || !fIn.isDirectory())
        {
            log(dirIn + " doesn't point to an existing directory");
            return;
        }

        // Add js includes to an array, removing any path that may be present
        String[] jsNameArray = new String[jsFileArray.length];
        for (int i = 0; i < jsFileArray.length; i++)
        {
            String fullName = jsFileArray[i];
            String[] names = fullName.split("/");
            String name = names[names.length - 1];
            jsNameArray[i] = name;
        }

        FilenameFilter htmlFilter = new FilenameFilter()
        {
            public boolean accept(File dir, String name)
            {
                String lowercaseName = name.toLowerCase();
                if (lowercaseName.endsWith(".html"))
                {
                    return true;
                }
                return false;
            }
        };

        /*
         * Loop through all HTML files in dirIn
         */
        File[] fileArray = fIn.listFiles(htmlFilter);
        if (fileArray != null && fileArray.length > 0)
        {
            for (int i = 0; i < fileArray.length; i++)
            {
                File file = fileArray[i];

                boolean writtenCSS = false;
                boolean process = true;

                for (int j = 0; j < htmlFileArray.length; j++)
                {
                    String excludeName = htmlFileArray[j];
                    if (excludeName.equals(file.getName().toLowerCase()))
                    {
                        process = false;
                    }
                }

                // New HTML file
                File fileOut = new File(dirOut + File.separator + file.getName());
                OutputStreamWriter fw = new OutputStreamWriter(new FileOutputStream(fileOut),
                        "UTF-8");
                BufferedWriter bw = new BufferedWriter(fw);

                // Current HTML file
                InputStreamReader fr = new InputStreamReader(new FileInputStream(dirIn
                        + File.separator + file.getName()), "UTF-8");
                BufferedReader br = new BufferedReader(fr);
                String line = br.readLine();

                while (line != null)
                {
                    if (line.trim().startsWith("<script") && process)
                    {
                        /*
                         * If the script is in the array of script names then don't add it to the
                         * new HTML file
                         */
                        boolean found = false;
                        for (int j = 0; j < jsNameArray.length; j++)
                        {
                            String name = jsNameArray[j];
                            if (line.indexOf(name) > -1)
                            {
                                found = true;
                                break;
                            }
                        }
                        if (!found)
                        {
                            if (baseURL != null)
                            {
                                line = line.replace("src=\"..", "src=\"" + baseURL);
                            }
                            bw.write(line);
                            bw.newLine();
                        }
                    } else if (line.trim().startsWith("<link") && process)
                    {
                        /*
                         * If the css is in the array of css names then don't add it to the new HTML
                         * file
                         */
                        boolean found = false;
                        for (int j = 0; j < cssFileArray.length; j++)
                        {
                            String name = cssFileArray[j];
                            if (line.indexOf(name) > -1)
                            {
                                found = true;
                                break;
                            }
                        }
                        if (!found)
                        {
                            if (baseURL != null)
                            {
                                line = line.replace("href=\"..", "href=\"" + baseURL);
                            }
                            bw.write(line);
                            bw.newLine();
                        }
                        if (!writtenCSS)
                        {
                            /*
                             * In the new HTML file we must include the minimized KonaKart css file
                             */

                            if (baseURL == null)
                            {
                                bw.write("<link type=\"text/css\" rel=\"stylesheet\" href=\"../styles/kk-tile-gen.min.css\" />");
                            } else
                            {
                                bw.write("<link type=\"text/css\" rel=\"stylesheet\" href=\""
                                        + baseURL + "/styles/kk-tile-gen.min.css\" />");
                            }
                            bw.newLine();
                            writtenCSS = true;
                        }
                    } else if (line.trim().startsWith("</head>") && process)
                    {
                        /*
                         * In the new HTML file we must include the minimized KonaKart js file
                         */
                        if (baseURL == null)
                        {
                            bw.write("<script type=\"text/javascript\" src=\"../script/kk-tile-gen.min.js\"></script>");
                        } else
                        {
                            bw.write("<script type=\"text/javascript\" src=\"" + baseURL
                                    + "/script/kk-tile-gen.min.js\"></script>");
                        }

                        bw.newLine();
                        bw.write(line);
                        bw.newLine();
                    } else
                    {
                        bw.write(line);
                        bw.newLine();
                    }
                    line = br.readLine();
                }
                bw.flush();
                bw.close();
                fw.close();
                br.close();
                fr.close();
            }
        }
    }

    /**
     * Create a single javaScript file from multiple files defined in the static variable
     * <code>jsFileArray</code>.
     * 
     * @param dir
     *            Directory where we can find the source files
     * @param fileNameOut
     *            The name of the generated javaScript file
     * @throws IOException
     */
    public static void createJS(String dir, String fileNameOut) throws IOException
    {
        File fIn = new File(dir);
        if (!fIn.exists() || !fIn.isDirectory())
        {
            log(dir + " doesn't point to an existing directory");
            return;
        }

        File fileOut = new File(fileNameOut);
        OutputStreamWriter fw = new OutputStreamWriter(new FileOutputStream(fileOut), "UTF-8");
        BufferedWriter bw = new BufferedWriter(fw);
        try
        {
            bw.write("/**");
            bw.newLine();
            bw.write("* @license (c) 2015 DS Data Systems UK Ltd, All rights reserved.");
            bw.newLine();
            bw.write("*/");
            bw.newLine();
            for (int i = 0; i < jsFileArray.length; i++)
            {
                String fileName = jsFileArray[i];
                String filePath = dir + File.separator + fileName;

                File readFile = new File(filePath);
                if (!readFile.exists())
                {
                    log(filePath + " doesn't exist");
                    return;
                }

                InputStreamReader fr = new InputStreamReader(new FileInputStream(readFile), "UTF-8");
                BufferedReader br = new BufferedReader(fr);

                String line = br.readLine();
                while (line != null)
                {
                    bw.write(line);
                    bw.newLine();
                    line = br.readLine();
                }
                br.close();
                fr.close();

                bw.newLine();
                bw.newLine();
            }
        } finally
        {
            // Close the file writer

            bw.flush();
            bw.close();
            fw.close();
        }
    }

    /**
     * Create a single CSS file from multiple files defined in the static variable
     * <code>cssFileArray</code>.
     * 
     * @param dir
     *            Directory where we can find the source files
     * @param fileNameOut
     *            The name of the generated CSS file
     * @throws IOException
     */
    public static void createCSS(String dir, String fileNameOut) throws IOException
    {
        File fIn = new File(dir);
        if (!fIn.exists() || !fIn.isDirectory())
        {
            log(dir + " doesn't point to an existing directory");
            return;
        }

        File fileOut = new File(fileNameOut);
        OutputStreamWriter fw = new OutputStreamWriter(new FileOutputStream(fileOut), "UTF-8");

        BufferedWriter bw = new BufferedWriter(fw);

        try
        {
            bw.write("/*!  (c) 2015 DS Data Systems UK Ltd, All rights reserved. */");
            bw.newLine();

            for (int i = 0; i < cssFileArray.length; i++)
            {
                String fileName = cssFileArray[i];
                String filePath = dir + File.separator + fileName;

                File test = new File(filePath);
                if (!test.exists())
                {
                    log(filePath + " doesn't exist");
                    return;
                }

                InputStreamReader fr = new InputStreamReader(new FileInputStream(filePath), "UTF-8");
                BufferedReader br = new BufferedReader(fr);

                String line = br.readLine();
                while (line != null)
                {
                    bw.write(line);
                    bw.newLine();
                    line = br.readLine();
                }
                br.close();
                fr.close();

                bw.newLine();
                bw.newLine();

            }
        } finally
        {
            // Close the file writer
            bw.flush();
            bw.close();
            fw.close();
        }
    }

    /**
     * Create a single javaScript file from multiple template files. This is much better for
     * production use since all of the templates can be read from a single js file that only has to
     * be downloaded once.
     * 
     * @param dir
     *            Directory where we can find the source template files
     * @param fileNameOut
     *            The name of the generated javaScript file
     * @throws IOException
     */
    public static void createTemplateJS(String dir, String fileNameOut) throws IOException
    {
        File fIn = new File(dir);
        if (!fIn.exists() || !fIn.isDirectory())
        {
            log(dir + " doesn't point to an existing directory");
            return;
        }

        File fileOut = new File(fileNameOut);
        OutputStreamWriter fw = new OutputStreamWriter(new FileOutputStream(fileOut), "UTF-8");
        BufferedWriter bw = new BufferedWriter(fw);
        bw.write("var kkTmplMap = new Object();");
        bw.newLine();

        FilenameFilter htmlFilter = new FilenameFilter()
        {
            public boolean accept(File dir, String name)
            {
                String lowercaseName = name.toLowerCase();
                if (lowercaseName.endsWith(".html"))
                {
                    return true;
                }
                return false;
            }
        };
        File[] fileArray = fIn.listFiles(htmlFilter);
        if (fileArray != null && fileArray.length > 0)
        {
            for (int i = 0; i < fileArray.length; i++)
            {
                File file = fileArray[i];
                InputStreamReader fr = new InputStreamReader(new FileInputStream(dir
                        + File.separator + file.getName()), "UTF-8");
                BufferedReader br = new BufferedReader(fr);
                String line = br.readLine();

                boolean startHeader = false;
                boolean endHeader = false;
                boolean firstLine = true;
                while (line != null)
                {
                    line = line.trim();
                    if (line.startsWith("<%") && startHeader == false)
                    {
                        startHeader = true;
                    } else if (line.startsWith("%>") && startHeader == true && endHeader == false)
                    {
                        endHeader = true;
                    } else if (line.startsWith("//"))
                    {
                        // Leave out comments
                    } else if (endHeader)
                    {
                        if (firstLine)
                        {
                            String templateName = file.getName().substring(0,
                                    file.getName().lastIndexOf('.'));
                            bw.write("kkTmplMap[\"" + templateName + "\"] = \"");
                            firstLine = false;
                        }
                        line = line.replace("\"", "\\\"");
                        bw.write(line.trim());
                    }
                    line = br.readLine();
                }
                bw.write("\";");
                bw.newLine();
                br.close();
                fr.close();
            }
        }
        // Close the file writer
        bw.flush();
        bw.close();
        fw.close();
    }

    /**
     * Writes the message to a log file
     * 
     * @param msg
     * @throws IOException
     */
    static void log(String msg) throws IOException
    {
        if (logFile == null)
        {
            System.out.println(msg);
        } else
        {
            File f = new File(logFile);
            File dir = f.getParentFile();
            if (dir != null)
            {
                if (!dir.exists())
                {
                    dir.mkdir();
                }
            }
            f.createNewFile();
            OutputStreamWriter fw = new OutputStreamWriter(new FileOutputStream(logFile), "UTF-8");
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(msg);
            bw.newLine();
            bw.flush();
            bw.close();
            fw.close();
        }
    }

    /**
     * @return Returns the logFile.
     */
    public static String getLogFile()
    {
        return logFile;
    }

    /**
     * @param logFile
     *            The logFile to set.
     */
    public static void setLogFile(String logFile)
    {
        TileBuildUtils.logFile = logFile;
    }
}
